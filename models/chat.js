import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const chatSchema = mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: 'user'
    },
    senderName: {
        type: String
    },
    receiver: {
        type: ObjectId,
        ref: 'user'
    },
    receiverName: {
        type: String
    },
    message: {
        type: String,
    },
    roomId: {
        type: String,
    },
    createdAt: { type: Date, expires: '24h', default: Date.now }
})

const Chat = mongoose.model('chat', chatSchema)

export default Chat