import { getTransporter, isEmailConfigured } from "./nodemailer.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export async function sendWelcomeEmail({ to, name }) {
    if (!isEmailConfigured()) {
        return null
    }

    const transporter = getTransporter()
    if (!transporter) {
        return null
    }

    const clientURL = process.env.FRONTEND_URL || "http://localhost:5173"
    const html = createWelcomeEmailTemplate(name, clientURL)

    return transporter.sendMail({
        from: process.env.SMTP_FROM || `"ChatWar" <${process.env.SMTP_USER}>`,
        to,
        subject: "Welcome to ChatWar",
        html,
    })
}
