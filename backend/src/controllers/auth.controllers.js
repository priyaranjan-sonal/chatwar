import User from "../models/user.model.js"
import generateToken from "../library/utils.js"
import { sendWelcomeEmail } from "../email/emailHandler.js"

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists. Try login" })
        }

        const newUser = await User.create({ fullName, email, password })

        try {
            await sendWelcomeEmail({ to: email, name: fullName })
            console.log("Welcome email sent successfully.")
        } catch (error) {
            console.log("Error sending welcome email: ", error)
        }

        generateToken(newUser._id, res)

        res.status(201).json({
            message: "User Registered successfully",
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            },
        })
    } catch (error) {
        console.log("Error creating user: ", error)
        res.status(500).json({ message: error.message })
    }
}

// export const login = async (req, res) => {
//     const { email, password } = req.body

//     try {
//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" })
//         }

//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" })
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, user.password)
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: "Invalid email or password" })
//         }

//         generateToken(user._id, res)

//         res.status(200).json({
//             message: "Login successful",
//             user: {
//                 _id: user._id,
//                 fullName: user.fullName,
//                 email: user.email,
//                 profilePic: user.profilePic,
//             },
//         })
//     } catch (error) {
//         console.log("Error logging in: ", error)
//         res.status(500).json({ message: error.message })
//     }
// }