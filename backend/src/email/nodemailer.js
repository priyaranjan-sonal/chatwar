import nodemailer from "nodemailer"

let transporter = null

function getSmtpConfig() {
    const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_SECURE } = process.env

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        return null
    }

    return {
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: SMTP_SECURE === "true",
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    }
}

export function isEmailConfigured() {
    return getSmtpConfig() !== null
}

export function getTransporter() {
    const config = getSmtpConfig()

    if (!config) {
        return null
    }

    if (!transporter) {
        transporter = nodemailer.createTransport(config)
    }

    return transporter
}
