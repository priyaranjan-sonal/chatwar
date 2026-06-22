import User from "../models/user.model.js"
import generateToken from "../library/utils.js"
import bcrypt from "bcryptjs"
import cloudinary from "../library/cloudinary.js"
import {
    validateSignupInput,
    validateLoginInput,
    getMongooseValidationMessage,
} from "../library/auth.validation.js"

const formatAuthUser = (user) => ({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePic: user.profilePic,
    createdAt: user.createdAt,
})

export const signup = async (req, res) => {
    try {
        const { errors, normalizedUsername, normalizedFullName } = validateSignupInput(req.body)
        if (errors.length) {
            return res.status(400).json({ message: errors[0], errors })
        }

        const { password } = req.body

        const existingUser = await User.findOne({ username: normalizedUsername })
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Try login" })
        }

        const newUser = await User.create({
            fullName: normalizedFullName,
            username: normalizedUsername,
            password,
        })
        generateToken(newUser._id, res)

        res.status(201).json({
            message: "User Registered successfully",
            user: formatAuthUser(newUser),
        })
    } catch (error) {
        console.log("Error creating user: ", error)

        const validationMessage = getMongooseValidationMessage(error)
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage })
        }

        if (error.code === 11000) {
            return res.status(400).json({ message: "Username already exists. Try login" })
        }

        res.status(500).json({ message: "Something went wrong" })
    }
}

export const login = async (req, res) => {
    try {
        const { errors, normalizedUsername } = validateLoginInput(req.body)
        if (errors.length) {
            return res.status(400).json({ message: errors[0], errors })
        }

        const { password } = req.body
        const user = await User.findOne({ username: normalizedUsername }).select("+password")
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid username or password" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            message: "Login successful",
            user: formatAuthUser(user),
        })
    } catch (error) {
        console.log("Error logging in: ", error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully" })
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body
        if (!profilePic) return res.status(400).json({ message: "Profile pic is required" })

        const userId = req.user._id

        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "chatwar/profile_pics",
            public_id: userId.toString(),
            overwrite: true,
            invalidate: true,
        })
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true, runValidators: true }
        )

        res.status(200).json({
            message: "Profile updated successfully",
            user: formatAuthUser(updatedUser),
        })
    } catch (error) {
        console.log("Error in update profile: ", error)

        const validationMessage = getMongooseValidationMessage(error)
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage })
        }

        res.status(500).json({ message: error.message || "Failed to update profile" })
    }
}
