import React, { useRef, useState } from 'react'
import { useChatStore } from "../store/useChatStore.js"
import { ImageIcon, SendIcon, Trash2, LoaderIcon } from "lucide-react"
import toast from "react-hot-toast"

function MessageInput() {

  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const { sendMessage, isSendingMessage } = useChatStore()

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim() && !imagePreview) return

    const messageData = {
      text: text.trim(),
      image: imagePreview,
    }

    setText("")
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""

    await sendMessage(messageData)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      e.target.value = ""
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="shrink-0 border-t border-prsBorder p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {imagePreview && (
        <div className="mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-prsBorder"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-prsCharcoal flex items-center justify-center text-prsSnow hover:bg-prsGraphite"
              type="button"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.value = ""
            fileInputRef.current?.click()
          }}
          className={`flex items-center justify-center h-11 w-11 shrink-0 panel-surface border border-prsBorder text-prsSilver hover:text-prsSnow rounded-lg transition-colors ${
            imagePreview ? "text-prsBlue border-prsBlue/50" : ""
          }`}
        >
          <ImageIcon className="size-6 p-0.5" />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 min-w-0 h-11 panel-surface border border-prsBorder rounded-xl px-4 text-prsSnow placeholder:text-prsSilver focus:outline-none focus:border-prsBlue/50"
        />

        <button
          type="submit"
          disabled={(!text.trim() && !imagePreview) || isSendingMessage}
          className="flex items-center justify-center h-11 w-11 shrink-0 bg-gradient-to-r from-prsBlue to-prsNavy text-prsWhite rounded-lg hover:from-prsNavy hover:to-prsNavy transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSendingMessage ? (
            <LoaderIcon className="size-6 animate-spin" />
          ) : (
            <SendIcon className="size-6 p-0.5" />
          )}
        </button>
      </form>
    </div>
  )
}

export default MessageInput
