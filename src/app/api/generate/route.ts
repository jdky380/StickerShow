import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    console.log('Debug info:', {
      hasToken: !!process.env.REPLICATE_API_TOKEN,
      tokenLength: process.env.REPLICATE_API_TOKEN?.length,
      hasWebhook: !!process.env.REPLICATE_WEBHOOK,
      webhookUrl: process.env.REPLICATE_WEBHOOK,
      text: text
    });

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: 'Replicate API token not configured' },
        { status: 500 }
      );
    }

    console.log('About to call Replicate API...');

    // 使用环境变量中的版本号，如果没有则使用默认版本
    const modelVersion = process.env.REPLICATE_API_VERSION || "4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a";
    const modelId = `fofr/sticker-maker:${modelVersion}`;

    // 使用replicate.run()进行同步调用，直接等待结果
    const output = await replicate.run(
      modelId as any,
      {
        input: {
          prompt: text
        }
      }
    );

    console.log('Replicate output:', output);

    // output是一个包含图片URL的数组
    const imageUrl = Array.isArray(output) && output.length > 0 ? output[0] : null;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        text: text,
        image_url: imageUrl,
        created_at: new Date().toISOString(),
        message: 'Sticker generated successfully!'
      }
    });

  } catch (error) {
    console.error('Generate sticker error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate sticker', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 