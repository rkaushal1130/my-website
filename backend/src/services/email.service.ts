import nodemailer, { Transporter } from 'nodemailer';
import { logger } from '../utils/logger';
import { env } from '../config/environment';

export interface ContactNotificationData {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  submittedAt?: Date;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class EmailService {
  private static transporter: Transporter | null = null;

  /**
   * Initializes and caches the Nodemailer SMTP transporter for Titan Mail
   */
  private static getTransporter(): Transporter | null {
    const user = process.env.EMAIL_USER || env.EMAIL_USER;
    const pass = process.env.EMAIL_PASSWORD || env.EMAIL_PASSWORD;

    if (!user || !pass) {
      return null;
    }

    if (!this.transporter) {
      const host = process.env.EMAIL_HOST || env.EMAIL_HOST || 'smtp.titan.email';
      const port = parseInt(process.env.EMAIL_PORT || String(env.EMAIL_PORT || 465), 10);
      const secure = port === 465;

      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });

      logger.info(`[EmailService] Initialized Titan SMTP transporter for ${user} via ${host}:${port}`);
    }

    return this.transporter;
  }

  /**
   * Sends an email notification to the Titan business inbox with contact form details
   */
  public static async sendContactNotification(
    data: ContactNotificationData
  ): Promise<EmailSendResult> {
    const recipientEmail = process.env.EMAIL_USER || env.EMAIL_USER || env.NOTIFICATION_EMAIL;
    const user = process.env.EMAIL_USER || env.EMAIL_USER;
    const pass = process.env.EMAIL_PASSWORD || env.EMAIL_PASSWORD;

    if (!user || !pass) {
      const warnMsg =
        '[EmailService] Titan SMTP credentials (EMAIL_USER, EMAIL_PASSWORD) are not set in .env. Skipping email notification.';
      logger.warn(warnMsg);
      return {
        success: false,
        error: 'Titan SMTP credentials not configured in environment variables.',
      };
    }

    try {
      const transporter = this.getTransporter();
      if (!transporter) {
        throw new Error('Failed to create Titan SMTP transport');
      }

      const formattedDate = (data.submittedAt || new Date()).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });

      const subject = `New Contact Form Submission - ${data.name}`;

      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border: 1px solid #e1e4e8;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0b0b0e; padding: 24px 30px; border-bottom: 3px solid #FF1F26;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">
                <span style="color: #FF1F26;">Avaura</span> Inquiry Notification
              </h1>
              <p style="margin: 6px 0 0 0; color: #a1a1aa; font-size: 13px;">
                A new message has been submitted from your website contact form.
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                Client Information
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; width: 140px; color: #6b7280; font-weight: 600;">Name:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${data.email}" style="color: #FF1F26; text-decoration: none; font-weight: 600;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Phone:</td>
                  <td style="padding: 8px 0; color: #111827;">${data.phone || '<span style="color: #9ca3af; font-style: italic;">Not provided</span>'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Company:</td>
                  <td style="padding: 8px 0; color: #111827;">${data.company || '<span style="color: #9ca3af; font-style: italic;">Not provided</span>'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Service / Subject:</td>
                  <td style="padding: 8px 0; color: #111827;">
                    <span style="background-color: #f3f4f6; color: #1f2937; padding: 3px 10px; border-radius: 4px; font-size: 13px; font-weight: 500; border: 1px solid #e5e7eb;">
                      ${data.service || 'General Inquiry'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Submitted At:</td>
                  <td style="padding: 8px 0; color: #4b5563; font-size: 13px;">${formattedDate}</td>
                </tr>
              </table>

              <!-- Message Section -->
              <div style="margin-top: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #111827; font-size: 15px; font-weight: 600;">
                  Message / Project Details:
                </h3>
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-left: 4px solid #FF1F26; border-radius: 4px; padding: 16px; color: #1f2937; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${data.message}</div>
              </div>

              <!-- Quick Action Button -->
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${data.email}?subject=Re: Your Inquiry on Avaura" style="display: inline-block; background-color: #FF1F26; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; letter-spacing: 0.3px;">
                  Reply to ${data.name}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 16px 30px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
              <p style="margin: 0;">
                Delivered via Titan Business Email to <strong>${recipientEmail}</strong>.
              </p>
              <p style="margin: 4px 0 0 0;">
                Clicking "Reply" in your email client will reply directly to <strong>${data.email}</strong>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      const textContent = `
New Contact Form Submission - ${data.name}
--------------------------------------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Service: ${data.service || 'General Inquiry'}
Submitted At: ${formattedDate}

Message:
${data.message}

--------------------------------------------------
Reply directly to: ${data.email}
      `.trim();

      const mailOptions = {
        from: `"Avaura Contact Form" <${user}>`,
        to: recipientEmail,
        replyTo: data.email, // Visitor's email so clicking Reply in Titan/Gmail replies to visitor
        subject,
        text: textContent,
        html: htmlContent,
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info(`[EmailService] ✅ Titan email notification delivered for ${data.name}. MessageId=${info.messageId}`);

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      logger.error(`[EmailService] ❌ Failed to send Titan email notification: ${errMsg}`);
      return {
        success: false,
        error: errMsg,
      };
    }
  }
}
