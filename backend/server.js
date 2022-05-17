const express = require('express');//package
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
// const noteRoutes = require('./routes/noteRoutes');
const chatRoutes = require('./routes/chatRoutes');
// const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const app = express();//object of the imported package
dotenv.config();
connectDB();

const cors = require('cors')
app.use(cors())

app.use(express.json());
/*MiddleWares */
// // app.use(path, middleware) is used to call middleware function that needs to be called before the route is hit for the corresponding path.
// Middleware functions are functions that have access to the request object(req), the response object(res), and the next middleware function in the application’s request - response cycle. 
// next() fn needs to be called within each middleware function when multiple middleware functions are passed to app.use, else the next middleware function won’t be called.
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/chat', chatRoutes)

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const host = '0.0.0.0';
const http = require('http')
const { Server } = require('socket.io')

const server = http.createServer(app);
const io = new Server(server, {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode': 'no-cors'
    },
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})
io.on('connection', (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID:${socket.id} joined room ${data}`)
    })
    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data);
    })
    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id)
    })
    // socket.off("join_room", () => {
    //     console.log("User Disconnected");
    //     socket.leave(data._id);
    // })
})
server.listen(PORT, host, () => {
    console.log("Connected")
})
