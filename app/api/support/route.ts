import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { message, email } = await req.json();  // Access the JSON body of the request

    if (!message || !email) {
      return NextResponse.json({ success: false, error: 'Message and email are required' }, { status: 400 });
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,  // From email address (sender)
      to: process.env.EMAIL_USER,  // Support email
      subject: 'Leave Support Request',
      text: `Message: ${message}\n\nFrom: ${email}`,
    };

    // Send email using nodemailer
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ success: true, message: 'Support request received' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'An error occurred while sending the email.' }, { status: 500 });
  }
}
