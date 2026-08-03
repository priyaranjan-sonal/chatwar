function MessagesLoadingSkeleton() {
  return (
    <div className="w-full space-y-3 px-3 sm:space-y-4 sm:px-0">
      {[...Array(6)].map((_, index) => {
        const isOwn = index % 2 !== 0

        return (
          <div
            key={index}
            className={`flex w-full animate-pulse ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`chat-bubble h-10 w-32 ${
                isOwn ? "chat-bubble-sent" : "chat-bubble-received"
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}

export default MessagesLoadingSkeleton
