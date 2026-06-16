import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export async function sendWelcomeEmail({ to, name }) {
    if (!process.env.BREVO_API_KEY) {
        return null
    }

    const clientURL = process.env.FRONTEND_URL || "http://localhost:5173"
    const html = createWelcomeEmailTemplate(name, clientURL)
    const from = process.env.SMTP_FROM || '"ChatWar" <no-reply@chatwar.com>'

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
            sender: {
                name: from.replace(/"?(.*)"? <.*>/, "$1"),
                email: from.replace(/.*<(.+)>/, "$1"),
            },
            to: [{ email: to, name }],
            subject: "Welcome to ChatWar",
            htmlContent: html,
        }),
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Brevo send failed: ${response.status} ${errorText}`)
    }

    return response.json()
}
