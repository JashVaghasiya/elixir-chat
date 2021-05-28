import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const doctorSchema = mongoose.Schema({
    name: {
        type: String
    },
    degree: {
        type: String
    },
    experience: {
        type: Number,
    },
    email: {
        type: String
    },
    specialization: {
        type: String
    },
    mobile: {
        type: Number
    },
    isActive: {
        type: Boolean
    }
}, { timestamps: true })

const Doctor = mongoose.model('doctor', doctorSchema)

export default Doctor