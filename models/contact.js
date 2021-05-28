import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const contactSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    doctorId: {
        type: ObjectId,
        ref: 'doctor'
    },
    lastMessage: {
        type: String
    },
    roomId: {
        type: String,
    },
    userName: {
        type: String
    }
}, {
    timestamps: true
})

const Contact = mongoose.model('contact', contactSchema)

export default Contact