import Chat from '../models/chat.js'

export const sendChat = async (req, res) => {
    const { message, room } = req.body
    try {
        await new Chat({
            sender: message.sender,
            senderName: message.senderName,
            receiver: message.receiver,
            receiverName: message.receiverName,
            message: message.message,
            name: message.name,
            roomId: room
        }).save()
    } catch (err) {
        console.log(err);
    }
}


export const getMessages = async (req, res) => {
    const id = req.params.id
    try {
        Chat.find({ roomId: id }).exec((err, result) => {
            if (result) return res.json(result)
        })
    } catch (err) {
        console.log(err);
    }
}