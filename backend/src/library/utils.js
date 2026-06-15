import jwt from "jsonwebtoken"

const generateToken = (userID, res) => {
    const isProduction = process.env.NODE_ENV === "production"

    const token = jwt.sign(
        { userID },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES_IN }
    )

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    })

    return token
}

export default generateToken