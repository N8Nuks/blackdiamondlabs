export const dynamic = 'force-dynamic'

import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, sport, problem, audience, solution, competitors, stage, why } = body

  try {
    await resend.emails.send({
      from: 'BDL Contact <onboarding@resend.dev>',
      to: 'info@blackdiamondlabs.co.nz',
      replyTo: email,
      subject: `New Idea Submission — ${name}`,
      html: `
        <h2>New Idea Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr/>
        <p><strong>Sport / Community:</strong> ${sport}</p>
        <p><strong>Problem it solves:</strong> ${problem}</p>
        <p><strong>Who would use it:</strong> ${audience}</p>
        <p><strong>Solution:</strong> ${solution}</p>
        <p><strong>Competitors / alternatives:</strong> ${competitors || 'None provided'}</p>
        <p><strong>Stage:</strong> ${stage}</p>
        <p><strong>Why BDL:</strong> ${why}</p>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
