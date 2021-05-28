import Chat from '../models/chat.js'
import Contact from '../models/contact.js'
import Doctor from '../models/doctor.js'

export const setUserConnection = async (req, res) => {
    const userId = req.body.sender
    const userName = req.body.name
    const doctorId = req.body.receiver
    const roomId = req.body.room

    try {
        Contact.find({ doctorId: doctorId, userId: userId }).exec((err, result) => {
            if (result.length === 0) {
                new Contact({
                    userId: userId,
                    doctorId: doctorId,
                    roomId: roomId,
                    userName: userName
                }).save()
            }
        })

    } catch (err) {
        console.log(err);
    }
}

export const getDoctor = async (req, res) => {
    try {
        Doctor.find({}).exec((err, result) => {
            if (!err) return res.json(result)
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
}


export const getDoctorsContacts = async (req, res) => {
    const id = req.params.id
    try {
        Contact.find({ doctorId: id }).exec((err, result) => {
            if (result) return res.json(result)
            console.log(result);
        })
    } catch (err) {
        console.log(err);
    }
}
