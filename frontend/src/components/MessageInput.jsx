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
    <div className="p-3 border-t border-slate-700/50">
      {imagePreview && (
        <div className="mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
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
          onClick={(e) => {
            e.currentTarget.value = ""
          }}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.value = ""
            fileInputRef.current?.click()
          }}
          className={`flex items-center justify-center h-11 w-11 shrink-0 bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-slate-200 rounded-lg transition-colors ${
            imagePreview ? "text-cyan-500 border-cyan-500/50" : ""
          }`}
        >
          <ImageIcon className="size-6 p-0.5" />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 min-w-0 h-11 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
        />

        <button
          type="submit"
          disabled={(!text.trim() && !imagePreview) || isSendingMessage}
          className="flex items-center justify-center h-11 w-11 shrink-0 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
