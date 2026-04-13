import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/mailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy adres e-mail.' },
        { status: 400 }
      )
    }

    const contactMessage = await Promise.race([
      prisma.contactMessage.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        },
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1500))
    ]) as any

    // Send email notification
    await sendEmail({
      subject: `Nowa wiadomość z formularza kontaktowego: ${subject}`,
      html: `
        <h2>Otrzymano nową wiadomość z formularza kontaktowego</h2>
        <p><strong>Od:</strong> ${name} (${email})</p>
        <p><strong>Temat:</strong> ${subject}</p>
        <br/>
        <p><strong>Treść wiadomości:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <br/>
        <p><small>Wiadomość wygenerowana automatycznie ze strony OmniTask.</small></p>
      `
    })

    return NextResponse.json({ success: true, id: contactMessage.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera.' },
      { status: 500 }
    )
  }
}
