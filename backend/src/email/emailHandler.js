import nodemailer from "nodemailer"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export async function sendWelcomeEmail({ to, name }) {
    const gmailUser = process.env.GMAIL_USER
    const gmailPass = process.env.GMAIL_PASS

    if (!gmailUser || !gmailPass) {
        throw new Error("GMAIL_USER and GMAIL_PASS are required to send email")
    }

    const clientURL = process.env.FRONTEND_URL || "http://localhost:5173"
    const html = createWelcomeEmailTemplate(name, clientURL)
    const from = process.env.SMTP_FROM || `"ChatWar" <${gmailUser}>`

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: gmailUser,
            pass: gmailPass,
        },
    })

    const info = await transporter.sendMail({
        from,
        to,
        subject: "Welcome to ChatWar",
        html,
    })

    return {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
    }
}
