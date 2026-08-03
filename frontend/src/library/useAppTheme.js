import { useEffect, useState } from "react"
import { useChatStore } from "../store/useChatStore.js"

export function useAppTheme() {
  const [isLightMode, setIsLightMode] = useState(() => useChatStore.getState().theme === "light")

  useEffect(() => {
    useChatStore.getState().setTheme(isLightMode ? "light" : "dark")
  }, [isLightMode])

  return [isLightMode, setIsLightMode]
}
