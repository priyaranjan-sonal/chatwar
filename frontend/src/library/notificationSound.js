const notificationSound = new Audio("/notification.mp3")

const getId = (id) => (id?._id ?? id)?.toString?.() ?? String(id)

export const playMessageNotification = (message, authUser, isSoundEnabled) => {
    if (!isSoundEnabled || !authUser) return

    const myId = getId(authUser._id)
    const senderId = getId(message.senderId)
    const receiverId = getId(message.receiverId)

    if (receiverId !== myId || senderId === myId) return

    notificationSound.currentTime = 0
    notificationSound.play().catch(() => {})
}
