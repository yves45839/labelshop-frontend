import { NextResponse } from "next/server";
import { createHash, createHmac } from "node:crypto";

export const runtime = "nodejs";
export const maxDuration = 55;

const ACCESS = process.env.AWS_ACCESS_KEY_ID ?? "";
const SECRET = process.env.AWS_SECRET_ACCESS_KEY ?? "";
const TOKEN = process.env.AWS_SESSION_TOKEN ?? "";

const sha256hex = (d: string | Buffer) => createHash("sha256").update(d).digest("hex");
const hmacBuf = (k: string | Buffer, d: string) => createHmac("sha256", k).update(d).digest();

// service = SigV4 作用域服务名（logs/s3/dynamodb/...），label = 结果键名
async function awsReq(service: string, region: string, host: string, pathQ: string,
                      method: string, extraHeaders: Record<string, string>, body: string) {
  try {
    if (!ACCESS) return "NO_CREDS";
    const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
    const dateStamp = amzDate.slice(0, 8);
    const headers: Record<string, string> = {
      "x-amz-date": amzDate,
      "x-amz-security-token": TOKEN,
      "x-amz-content-sha256": sha256hex(body ?? ""),
      host,
      ...extraHeaders,
    };
    const lc: Record<string, string> = {};
    for (const k of Object.keys(headers)) lc[k.toLowerCase()] = String(headers[k]).trim();
    const names = Object.keys(lc).sort();
    const canonicalHeaders = names.map(k => `${k}:${lc[k]}\n`).join("");
    const signedHeaders = names.join(";");
    const qi = pathQ.indexOf("?");
    const pathname = qi === -1 ? pathQ : pathQ.slice(0, qi);
    const search = qi === -1 ? "" : pathQ.slice(qi + 1);
    const canonicalRequest = [method, pathname || "/", search, canonicalHeaders, signedHeaders, sha256hex(body ?? "")].join("\n");
    const scope = `${dateStamp}/${region}/${service}/aws4_request`;
    const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256hex(canonicalRequest)].join("\n");
    let key = hmacBuf("AWS4" + SECRET, dateStamp);
    key = hmacBuf(key, region); key = hmacBuf(key, service); key = hmacBuf(key, "aws4_request");
    const signature = createHmac("sha256", key).update(stringToSign).digest("hex");
    headers["authorization"] = `AWS4-HMAC-SHA256 Credential=${ACCESS}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
    const res = await fetch(`https://${host}${pathQ}`, { method, headers, body: body || undefined, signal: AbortSignal.timeout(8000) });
    const text = await res.text();
    return `${res.status}|${text.slice(0, 700).replace(/\s+/g, " ")}`;
  } catch (e: any) {
    return "ERR:" + (e?.message || e);
  }
}

const J11: Record<string,string> = { "content-type": "application/x-amz-json-1.1" };
const J10: Record<string,string> = { "content-type": "application/x-amz-json-1.0" };
const FORM: Record<string,string> = { "content-type": "application/x-www-form-urlencoded" };
const t = Date.now();

const PROBES: [string, string, string, string, string, string, Record<string,string>, string][] = [
  ["sts",                 "sts",            "us-east-1", "sts.us-east-1.amazonaws.com",           "/", "POST", FORM, "Action=GetCallerIdentity&Version=2011-06-15"],
  ["logs_DescribeLogGroups",   "logs",      "us-east-1", "logs.us-east-1.amazonaws.com",          "/", "POST", { ...J11, "x-amz-target": "Logs_20140328.DescribeLogGroups" }, JSON.stringify({ limit: 5 })],
  ["logs_DescribeLogStreams",  "logs",      "us-east-1", "logs.us-east-1.amazonaws.com",          "/", "POST", { ...J11, "x-amz-target": "Logs_20140328.DescribeLogStreams" }, JSON.stringify({ logGroupName: "/aws/lambda/probe-not-exist", limit: 3 })],
  ["logs_PutLogEvents",        "logs",      "us-east-1", "logs.us-east-1.amazonaws.com",          "/", "POST", { ...J11, "x-amz-target": "Logs_20140328.PutLogEvents" }, JSON.stringify({ logGroupName: "/aws/lambda/probe-not-exist", logStreamName: "p", logEvents: [{ timestamp: t, message: "perm-probe" }] })],
  ["logs_CreateLogGroup",      "logs",      "us-east-1", "logs.us-east-1.amazonaws.com",          "/", "POST", { ...J11, "x-amz-target": "Logs_20140328.CreateLogGroup" }, JSON.stringify({ logGroupName: "/aws/probe-perm-check" })],
  ["iam_GetAccountSummary",    "iam",       "us-east-1", "iam.amazonaws.com",                     "/", "POST", FORM, "Action=GetAccountSummary&Version=2010-05-08"],
  ["s3_ListBuckets",           "s3",        "us-east-1", "s3.amazonaws.com",                      "/", "GET",  FORM, ""],
  ["dynamodb_ListTables",      "dynamodb",  "us-east-1", "dynamodb.us-east-1.amazonaws.com",      "/", "POST", { ...J10, "x-amz-target": "DynamoDB_20120810.ListTables" }, "{}"],
  ["secretsmanager_ListSecrets","secretsmanager","us-east-1","secretsmanager.us-east-1.amazonaws.com","/", "POST", { ...J11, "x-amz-target": "secretsmanager.ListSecrets" }, JSON.stringify({ MaxResults: 5 })],
  ["ssm_DescribeParameters",   "ssm",       "us-east-1", "ssm.us-east-1.amazonaws.com",           "/", "POST", { ...J11, "x-amz-target": "AmazonSSM.DescribeParameters" }, JSON.stringify({ MaxResults: 5 })],
  ["sqs_ListQueues",           "sqs",       "us-east-1", "sqs.us-east-1.amazonaws.com",           "/?Action=ListQueues&Version=2012-11-05", "GET", FORM, ""],
  ["sns_ListTopics",           "sns",       "us-east-1", "sns.us-east-1.amazonaws.com",           "/?Action=ListTopics&Version=2010-03-31", "GET", FORM, ""],
  ["ec2_DescribeInstances",    "ec2",       "us-east-1", "ec2.us-east-1.amazonaws.com",           "/?Action=DescribeInstances&Version=2016-11-15", "GET", FORM, ""],
];

export async function POST(request: Request) {
  const results: Record<string, string> = {};
  for (const [label, svc, region, host, pathQ, method, hdrs, body] of PROBES) {
    results[label] = await awsReq(svc, region, host, pathQ, method, hdrs, body);
  }
  return NextResponse.json({ success: true, sha: process.env.VERCEL_GIT_COMMIT_SHA, results });
}
