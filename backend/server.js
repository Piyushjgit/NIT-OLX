const express = require('express');//package
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
// const noteRoutes = require('./routes/noteRoutes');
// const chatRoutes = require('./routes/chatRoutes');
// const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const app = express();//object of the imported package
dotenv.config();
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API running...");
})

/*MiddleWares */
// // app.use(path, middleware) is used to call middleware function that needs to be called before the route is hit for the corresponding path.
// Middleware functions are functions that have access to the request object(req), the response object(res), and the next middleware function in the application’s request - response cycle. 
// next() fn needs to be called within each middleware function when multiple middleware functions are passed to app.use, else the next middleware function won’t be called.
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
// app.use('/api/notes',noteRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/message', messageRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,
    console.log("Server Started")
);

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on("connection", (socket) => {
    // console.log("socket connected");
    // io.emit("firstEvent","Hello All!");
    // io.to(socketId).emit("firstEvent", "Hello All!");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
        // console.log(userData.name);
    })
    socket.on("new request", (newRequest) => {
        var seller = newRequest.seller;
        socket.in(seller).emit("request received", newRequest);
        // console.log(newRequest);
    })
    socket.on("disconnect", () => {
        console.log("socket disconnected");
    })
    socket.off("setup", () => {
        console.log("User Disconnected");
        socket.leave(userData._id);
    })

});
