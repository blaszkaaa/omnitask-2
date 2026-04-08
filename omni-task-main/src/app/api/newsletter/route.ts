import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/mailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Adres e-mail jest wymagany.' },
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

    // Check if exists or just let unique constraint catch it? Let's check for a nicer error.
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.trim() }
    })
    
    if (existing) {
       return NextResponse.json(
        { error: 'Ten e-mail jest już zapisany.' },
        { status: 400 }
      )
    }

    const subscriber = await Promise.race([
      prisma.newsletterSubscriber.create({
        data: {
          email: email.trim(),
        },
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1500))
    ]) as any

    // Send email notification
    await sendEmail({
      subject: 'Nowy subskrybent newslettera - OmniTask',
      html: `
        <h2>Nowy zapis na newsletter!</h2>
        <p>Adres e-mail: <strong>${email}</strong> został dopisany do bazy subskrybentów.</p>
        <br/>
        <p><small>Wiadomość wygenerowana automatycznie ze strony OmniTask.</small></p>
      `
    })

    return NextResponse.json({ success: true, id: subscriber.id }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating newsletter subscriber:', error)
    if (error.code === 'P2002') {
       return NextResponse.json(
        { error: 'Ten e-mail jest już zapisany.' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera.' },
      { status: 500 }
    )
  }
}
