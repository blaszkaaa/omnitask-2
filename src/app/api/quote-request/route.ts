import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/mailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const quoteRequest = await Promise.race([
      prisma.quoteRequest.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim() || null,
          company: company?.trim() || null,
          message: message.trim(),
        },
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1500))
    ]) as any

    // Send email notification
    await sendEmail({
      subject: 'Nowe Zapytanie Ofertowe - OmniTask',
      html: `
        <h2>Otrzymano nowe zapytanie ofertowe</h2>
        <p><strong>Od:</strong> ${name} (${email})</p>
        <p><strong>Telefon:</strong> ${phone || 'Brak'}</p>
        <p><strong>Firma:</strong> ${company || 'Brak'}</p>
        <br/>
        <p><strong>Treść wiadomości:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <br/>
        <p><small>Wiadomość wygenerowana automatycznie ze strony OmniTask.</small></p>
      `
    })

    return NextResponse.json({ success: true, id: quoteRequest.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating quote request:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
