import { NextRequest, NextResponse } from 'next/server';

const DJANGO_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://lr-samr.pythonanywhere.com';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS });
}

/**
 * GET /api/blogs          → Django GET /blogs/       (liste)
 * GET /api/blogs?id=X     → Django GET /blogs/<id>/  (détail)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const url = id
      ? `${DJANGO_BASE}/blogs/${id}/`
      : `${DJANGO_BASE}/blogs/`;

    const djangoRes = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // cache: 'no-store' pour toujours avoir les données fraîches
      cache: 'no-store',
    });

    const data = await djangoRes.json().catch(() => (id ? {} : []));
    return NextResponse.json(data, { status: djangoRes.status, headers: CORS });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Erreur proxy GET' },
      { status: 500, headers: CORS }
    );
  }
}

/**
 * POST /api/blogs
 * Proxy → Django POST /blogs/create/
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const djangoRes = await fetch(`${DJANGO_BASE}/blogs/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await djangoRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: djangoRes.status, headers: CORS });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Erreur proxy POST' },
      { status: 500, headers: CORS }
    );
  }
}

/**
 * PATCH /api/blogs?id=X
 * Proxy → Django POST /blogs/<id>/update/
 */
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    const djangoRes = await fetch(`${DJANGO_BASE}/blogs/${id}/update/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await djangoRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: djangoRes.status, headers: CORS });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Erreur proxy PATCH' },
      { status: 500, headers: CORS }
    );
  }
}

/**
 * DELETE /api/blogs?id=X
 * Proxy → Django DELETE /blogs/<id>/delete/
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const djangoRes = await fetch(`${DJANGO_BASE}/blogs/${id}/delete/`, {
      method: 'DELETE',
    });

    if (djangoRes.ok) {
      return new NextResponse(null, { status: 204, headers: CORS });
    }
    const data = await djangoRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: djangoRes.status, headers: CORS });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Erreur proxy DELETE' },
      { status: 500, headers: CORS }
    );
  }
}
