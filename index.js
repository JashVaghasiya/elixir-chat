import * as io from "socket.io"
import createServer from 'http'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db.js'
import { getDoctor, getDoctorsContacts, setUserConnection } from "./controller/contact.js"
import morgan from "morgan"
import { sendChat, getMessages } from "./controller/chat.js"
import bodyParser from "body-parser"
dotenv.config()
connectDB()

const app = express()

const server = createServer.createServer(app)
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const socketIO = new io.Server(server, {
    cors: {
        origin: "*"
    }
})

let subIO

socketIO.on('connection', socket => {
    subIO = socket

    socket.on("addUser", async (sender, room) => {
        socket.username = sender
        socket.join(room)
        socket.emit("addedUser", room)
    })
    socket.on("addDoctor", (room, sender) => {
        socket.username = sender
        socket.join(room)
        socket.emit("addedDoctor", room)
    })

    let flag = false
    socket.on("sendChat", (message, room) => {
        !flag && socketIO.in(room).emit('updateChat', message)
    })
})

app.use(function (request, response, next) {
    request.io = socketIO;
    request.subIO = subIO
    next();
});

app.post('/api/chat/send', sendChat)
app.post('/api/chat/connect/user', setUserConnection)
app.get('/api/doctors', getDoctor)
app.get('/api/doctors/:id', getDoctorsContacts)
app.get('/api/chat/:id', getMessages)

server.listen(process.env.PORT, (req, res) => {
    console.log(`SocketIO is running on PORT: 5001`)
})