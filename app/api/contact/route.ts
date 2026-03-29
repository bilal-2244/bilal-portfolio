import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: Request) {
  try {
    const { name, company, brief } = await req.json();

    if (!name || !brief) {
      return NextResponse.json({ error: 'Name and Brief are required.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // 1. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // e.g. mhdb8535@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'mhdb8535@gmail.com',
      subject: `New Lead from Bilal's Elite Hub: ${name} (${company || 'No Company'})`,
      text: `Timestamp: ${timestamp}\n\nName: ${name}\nCompany: ${company}\n\nProject Brief:\n${brief}`,
    };

    // We don't await email if we want parallel execution, but better to await for error handling
    const emailPromise = transporter.sendMail(mailOptions).catch(err => {
      console.error("Email Error:", err);
      // We don't fail the whole request if email fails, but log it
    });

    // 2. Google Spreadsheets Integration
    let sheetsPromise = Promise.resolve();
    
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      const auth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
      
      sheetsPromise = doc.loadInfo().then(async () => {
        // Attempt to find or get 'Client Leads 2026'
        const sheet = doc.sheetsByTitle['Client Leads 2026'] || doc.sheetsByIndex[0];
        
        await sheet.addRow({
          Timestamp: timestamp,
          Name: name,
          Company: company || 'N/A',
          Brief: brief,
        });
      }).catch(err => {
        console.error("Google Sheets Error:", err);
      });
    } else {
      console.warn("Google Sheets credentials not fully provided. Skipping sheets update.");
    }

    // Wait for both
    await Promise.all([emailPromise, sheetsPromise]);

    return NextResponse.json({ success: true, message: 'Message securely transmitted to core systems.' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
