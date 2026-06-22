import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  USERNAME_REGEX,
  AUTH_GUIDE,
  guideError,
  getSignupPasswordError,
} from "../library/auth.validation.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, guideError(AUTH_GUIDE.username)],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, guideError(AUTH_GUIDE.username)],
      maxlength: [20, guideError(AUTH_GUIDE.username)],
      match: [USERNAME_REGEX, guideError(AUTH_GUIDE.username)],
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, guideError(AUTH_GUIDE.password)],
      select: false,
      validate: {
        validator(value) {
          return !getSignupPasswordError(value)
        },
        message: (props) => getSignupPasswordError(props.value) || "Invalid password",
      },
    },
    profilePic: {
      type: String,
      default: "",
      maxlength: [2048, "Profile picture URL is too long"],
      validate: {
        validator(value) {
          if (!value) return true
          return /^https?:\/\/.+/i.test(value)
        },
        message: "Profile picture must be a valid URL",
      },
    },
  },  { timestamps: true }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model("User", userSchema)

export default User