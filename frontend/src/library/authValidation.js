import { AUTH_GUIDE, guideError } from "./authGuide.js"

export const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/

export { AUTH_GUIDE, guideError }

export const normalizeUsername = (username) =>
  typeof username === "string" ? username.trim().toLowerCase() : ""

const isStrongPassword = (password) =>
  /[a-zA-Z]/.test(password) && /\d/.test(password) && /[^a-zA-Z0-9]/.test(password)

export const getUsernameError = (username, { isLogin = false } = {}) => {
  const normalizedUsername = normalizeUsername(username)

  if (!normalizedUsername || !USERNAME_REGEX.test(normalizedUsername)) {
    return guideError("username", { isLogin })
  }
  return ""
}

export const getPasswordError = (password, { isSignup = false, isLogin = false } = {}) => {
  if (!isSignup) {
    if (typeof password !== "string" || !password) {
      return guideError("password", { isLogin })
    }
    return ""
  }

  if (
    typeof password !== "string" ||
    !password ||
    password.length < 8 ||
    password.length > 128 ||
    !isStrongPassword(password)
  ) {
    return guideError("password")
  }
  return ""
}

export const getSignupFieldErrors = ({ username, password }) => ({
  username: getUsernameError(username),
  password: getPasswordError(password, { isSignup: true }),
})

export const getLoginFieldErrors = ({ username, password }) => ({
  username: getUsernameError(username, { isLogin: true }),
  password: getPasswordError(password, { isLogin: true }),
})

export const hasFieldErrors = (fieldErrors) =>
  Object.values(fieldErrors).some(Boolean)
