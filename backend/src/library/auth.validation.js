export const AUTH_GUIDE = {
    username: "username",
    password: "password",
}

export const guideError = (field) => `Create "${field}" according to guide`

export const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/

export const normalizeUsername = (username) =>
    typeof username === "string" ? username.trim().toLowerCase() : ""

const isStrongPassword = (password) =>
    /[a-zA-Z]/.test(password) && /\d/.test(password) && /[^a-zA-Z0-9]/.test(password)

export const getSignupPasswordError = (password) => {
    if (typeof password !== "string" || !password) {
        return guideError(AUTH_GUIDE.password)
    }
    if (password.length < 8 || password.length > 128 || !isStrongPassword(password)) {
        return guideError(AUTH_GUIDE.password)
    }
    return ""
}

const getUsernameError = (username) => {
    const normalizedUsername = normalizeUsername(username)

    if (!normalizedUsername || !USERNAME_REGEX.test(normalizedUsername)) {
        return guideError(AUTH_GUIDE.username)
    }
    return ""
}

export const validateSignupInput = ({ fullName, username, password }) => {
    const errors = [getUsernameError(username), getSignupPasswordError(password)].filter(Boolean)

    return {
        errors,
        normalizedUsername: normalizeUsername(username),
        normalizedFullName: typeof fullName === "string" ? fullName.trim() : "",
    }
}

export const validateLoginInput = ({ username, password }) => {
    const errors = []

    if (!normalizeUsername(username)) {
        errors.push(guideError(AUTH_GUIDE.username))
    }
    if (typeof password !== "string" || !password) {
        errors.push(guideError(AUTH_GUIDE.password))
    }

    return { errors, normalizedUsername: normalizeUsername(username) }
}

export const getMongooseValidationMessage = (error) => {
    if (error?.name !== "ValidationError") return null
    return Object.values(error.errors)[0]?.message || "Validation failed"
}
