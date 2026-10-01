import { NextResponse } from "next/server";
import { createHash, createHmac } from "node:crypto";

export const runtime = "nodejs";
export const maxDuration = 55;

const ACCESS = process.env.AWS_ACCESS_KEY_ID ?? "";
const SECRET = process.env.AWS_SECRET_ACCESS_KEY ?? "";
const TOKEN = process.env.AWS_SESSION_TOKEN ?? "";
const sha256hex = (d: string | Buffer) => createHash("sha256").update(d).digest("hex");
const hmacBuf = (k: string | Buffer, d: string) => createHmac("sha256", k).update(d).digest();

async function awsReq(service: string, region: string, host: string, pathQ: string,
                      method: string, extraHeaders: Record<string, string>, body: string) {
  try {
    const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
    const dateStamp = amzDate.slice(0, 8);
    const headers: Record<string, string> = {
      "x-amz-date": amzDate, "x-amz-security-token": TOKEN,
      "x-amz-content-sha256": sha256hex(body ?? ""), host, ...extraHeaders,
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
    return `${res.status}|${text.slice(0, 500).replace(/\s+/g, " ")}`;
  } catch (e: any) { return "ERR:" + (e?.message || e); }
}

const J11: Record<string,string> = { "content-type": "application/x-amz-json-1.1" };

export async function POST(request: Request) {
  const e = process.env;
  const meta = {
    function_name: e.AWS_LAMBDA_FUNCTION_NAME || null,
    function_version: e.AWS_LAMBDA_FUNCTION_VERSION || null,
    log_group: e.AWS_LAMBDA_LOG_GROUP_NAME || null,
    log_stream: e.AWS_LAMBDA_LOG_STREAM_NAME || null,
    region: e.AWS_REGION || e.AWS_DEFAULT_REGION || null,
    memory: e.AWS_LAMBDA_FUNCTION_MEMORY_SIZE || null,
  };

  const results: Record<string, string> = {};
  const own = e.AWS_LAMBDA_LOG_GROUP_NAME || "";
  if (own) {
    results["OWN_logs_DescribeLogStreams"] = await awsReq("logs", "us-east-1", "logs.us-east-1.amazonaws.com", "/", "POST",
      { ...J11, "x-amz-target": "Logs_20140328.DescribeLogStreams" }, JSON.stringify({ logGroupName: own, limit: 3 }));
    results["OWN_logs_FilterLogEvents"] = await awsReq("logs", "us-east-1", "logs.us-east-1.amazonaws.com", "/", "POST",
      { ...J11, "x-amz-target": "Logs_20140328.FilterLogEvents" }, JSON.stringify({ logGroupName: own, limit: 1 }));
  } else {
    results["OWN"] = "no AWS_LAMBDA_LOG_GROUP_NAME";
  }
  // 对照：确认同 action 对他人日志组被拒（已在 v3 证实），此处再取一个"是否列出全部日志组"的对照
  results["logs_DescribeLogGroups"] = await awsReq("logs", "us-east-1", "logs.us-east-1.amazonaws.com", "/", "POST",
    { ...J11, "x-amz-target": "Logs_20140328.DescribeLogGroups" }, JSON.stringify({ limit: 3 }));
  results["sts"] = await awsReq("sts", "us-east-1", "sts.us-east-1.amazonaws.com", "/", "POST",
    { "content-type": "application/x-www-form-urlencoded" }, "Action=GetCallerIdentity&Version=2011-06-15");

  return NextResponse.json({ success: true, sha: e.VERCEL_GIT_COMMIT_SHA, meta, results });
}
