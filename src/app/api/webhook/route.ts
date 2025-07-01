import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Webhook received:', JSON.stringify(body, null, 2));
    
    // 检查prediction状态
    if (body.status === 'succeeded') {
      console.log('Prediction succeeded!');
      console.log('Output:', body.output);
      
      // 这里可以保存结果到数据库或其他处理
      // 例如：await saveResultToDatabase(body.id, body.output);
      
    } else if (body.status === 'failed') {
      console.log('Prediction failed:', body.error);
    } else {
      console.log('Prediction status:', body.status);
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
} 