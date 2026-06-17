import Mailjet from "node-mailjet"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export async function sendWelcomeEmail({ to, name }) {
    const apiKey = process.env.MAILJET_API_KEY
    const apiSecret = process.env.MAILJET_API_SECRET

    if (!apiKey || !apiSecret) {
        throw new Error("MAILJET_API_KEY and MAILJET_API_SECRET are required to send email")
    }

    const mailjet = Mailjet.connect(apiKey, apiSecret)
    const clientURL = process.env.FRONTEND_URL || "http://localhost:5173"
    const html = createWelcomeEmailTemplate(name, clientURL)
    const from = process.env.SMTP_FROM || "prsunani674@gmail.com"

    await mailjet
        .post("send", { version: "v3.1" })
        .request({
            Messages: [
                {
                    From: {
                        Email: from.replace(/.*<(.+)>/, "$1"),
                        Name: from.replace(/"?(.*)"? <.*>/, "$1"),
                    },
                    To: [
                        {
                            Email: to,
                            Name: name,
                        },
                    ],
                    Subject: "Welcome to ChatWar",
                    HTMLPart: html,
                },
            ],
        })

    return { status: "sent" }
}
