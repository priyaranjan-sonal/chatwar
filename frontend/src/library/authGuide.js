export const AUTH_GUIDE = {
  signup: {
    title: "Account requirements",
    rules: [
      {
        field: "username",
        label: "Username",
        text: "3–20 characters, letters, numbers, and underscores only",
      },
      {
        field: "password",
        label: "Password",
        text: "8–128 characters with at least one letter, one number, and one symbol",
      },
    ],
  },
  login: {
    tip: "Login with your valid credentials",
  },
}

export const guideError = (field, { isLogin = false } = {}) => {
  if (isLogin) {
    return `${field} is required`
  }
  return `Create "${field}" according to guide`
}
