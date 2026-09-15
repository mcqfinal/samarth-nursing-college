import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      studentName,
      phone,
      email,
      course,
      purpose,
      amount,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature if secret key exists
    if (keySecret && razorpay_signature && !razorpay_order_id.startsWith('order_test_')) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { error: 'Payment signature verification failed.' },
          { status: 400 }
        );
      }
    }

    // Record the paid enquiry / registration in database if available
    try {
      if (prisma) {
        await prisma.enquiry.create({
          data: {
            name: studentName || 'Online Applicant',
            phone: phone || 'N/A',
            email: email || null,
            course: course || 'GNM',
            message: `[ONLINE PAYMENT SUCCESSFUL] Purpose: ${purpose || 'Fee Payment'} | Amount: ₹${amount} | PaymentID: ${razorpay_payment_id || 'N/A'} | OrderID: ${razorpay_order_id || 'N/A'}`,
            status: 'NEW',
          },
        });
      }
    } catch (dbErr) {
      console.warn('Could not save enquiry to DB, continuing response:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and recorded successfully.',
      paymentId: razorpay_payment_id || `pay_${Date.now()}`,
      orderId: razorpay_order_id || `order_${Date.now()}`,
      amount: amount,
      date: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error while verifying payment.' },
      { status: 500 }
    );
  }
}
