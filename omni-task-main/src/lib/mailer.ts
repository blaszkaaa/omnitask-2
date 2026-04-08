import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
})

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to?: string
  subject: string
  html?: string
  text?: string
}) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || ''
  
  if (!notificationEmail) {
    console.warn('Skipping email notification: NOTIFICATION_EMAIL is not configured.')
    return false
  }

  try {
    const info = await transporter.sendMail({
      from: `"OmniTask Notifications" <${process.env.SMTP_USER}>`, // sender address
      to: to || notificationEmail, // list of receivers
      subject,
      text: text || '',
      html: html || '',
    })

    console.log('Message sent: %s', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
