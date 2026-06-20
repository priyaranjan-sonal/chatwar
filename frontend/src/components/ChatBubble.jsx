function ChatBubble({ isOwn, text, image, createdAt }) {
  const time = new Date(createdAt).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`chat-bubble w-fit max-w-[85%] sm:max-w-[75%] ${
          isOwn ? "chat-bubble-sent" : "chat-bubble-received"
        }`}
      >
        {image && (
          <img
            src={image}
            alt="Shared"
            className="rounded-lg max-h-40 w-full object-cover sm:max-h-48"
          />
        )}
        {text && (
          <p className={`text-sm leading-relaxed break-words ${image ? "mt-2" : ""}`}>
            {text}
          </p>
        )}
        <p className="mt-1 text-[11px] opacity-75">{time}</p>
      </div>
    </div>
  )
}

export default ChatBubble
