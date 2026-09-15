import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, studentName, phone, email, course, purpose } = body;

    const parsedAmount = Math.max(1, Math.round(Number(amount) || 500));
    const amountInPaise = parsedAmount * 100;
    const receiptId = `rcpt_${Date.now()}`;

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay live/test credentials are configured, create real order via Razorpay API
    if (keyId && keySecret && !keyId.includes('sample')) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: receiptId,
          notes: {
            studentName: studentName || 'Applicant',
            phone: phone || '',
            email: email || '',
            course: course || 'GNM',
            purpose: purpose || 'Application Fee',
          },
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error('Razorpay API error:', errData);
        return NextResponse.json(
          { error: errData.error?.description || 'Failed to create Razorpay order.' },
          { status: 400 }
        );
      }

      const orderData = await response.json();
      return NextResponse.json({
        success: true,
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId: keyId,
        receiptId: receiptId,
      });
    }

    // Fallback/Demo test mode (works seamlessly if keys are being set up)
    return NextResponse.json({
      success: true,
      orderId: `order_test_${Date.now()}`,
      amount: amountInPaise,
      currency: 'INR',
      keyId: keyId || 'rzp_test_1DP5mmOlF5G5ag',
      receiptId: receiptId,
      isDemo: !keySecret,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error while initializing payment.' },
      { status: 500 }
    );
  }
}
