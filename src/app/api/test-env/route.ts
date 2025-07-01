import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasToken: !!process.env.REPLICATE_API_TOKEN,
    tokenLength: process.env.REPLICATE_API_TOKEN?.length,
    hasWebhook: !!process.env.REPLICATE_WEBHOOK,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasApiVersion: !!process.env.REPLICATE_API_VERSION,
    environment: process.env.NODE_ENV
  });
} 