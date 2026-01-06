import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    const { formType, name, email, subject, message, organization, contactName, phone, orgType, teamSize } = body;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      console.error('Resend not configured. Email will not be sent.');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Build email content based on form type
    let htmlBody = '';
    let textBody = '';
    let emailSubject = '';

    if (formType === 'partnership') {
      emailSubject = `New Partnership Inquiry from ${organization || contactName}`;

      htmlBody = `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
        <p><strong>Contact Name:</strong> ${contactName || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Organization Type:</strong> ${orgType || 'N/A'}</p>
        <p><strong>Team Size / Order Quantity:</strong> ${teamSize || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;

      textBody = `
New Partnership Inquiry

Organization: ${organization || 'N/A'}
Contact Name: ${contactName || 'N/A'}
Email: ${email}
Phone: ${phone || 'N/A'}
Organization Type: ${orgType || 'N/A'}
Team Size / Order Quantity: ${teamSize || 'N/A'}

Message:
${message}
      `;
    } else {
      emailSubject = `New Contact Form Submission: ${subject || 'General Inquiry'}`;

      htmlBody = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;

      textBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject || 'General Inquiry'}

Message:
${message}
      `;
    }

    // Send email using Resend
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: 'support@giant-inside.com',
      subject: emailSubject,
      html: htmlBody,
      text: textBody,
      replyTo: email,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
