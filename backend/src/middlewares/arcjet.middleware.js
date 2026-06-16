import aj from "../library/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";


const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 })

        if (decision.isErrored()) {
            console.log("Arcjet decision error:", decision.reason)
            return res.status(503).json({ message: "Arcjet protection unavailable" })
        }

        if (decision.isDenied() || decision.conclusion === "DENY") {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests. Rate Limit exceeded. Please try again later" })
            }
            else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied" })
            } else {
                return res.status(403).json({ message: "Access denied by security policy" })
            }
        }

        if(decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed bot detected",
                message: "Malicious bot activity detected"
            })
        }

        next()

    } catch (error) {
        console.log("Arcjet protection error: ", error)
        return res.status(503).json({ message: "Arcjet protection failed" })
    }
}

export default arcjetProtection