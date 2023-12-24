
const io = require('socket.io')(3001 , {
    cors:{
        origin:'http://localhost:3000',
        methods:['GET' , 'POST']
    }
})

io.on('connection' , socket => {
    socket.emit('userID' , socket.id)

    socket.broadcast.emit('activeUsers' , socket.userName)

    socket.on('sendMsg' , (data) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        io.emit('reciveMsg' , {user:socket.id , message :data , time:timestamp})
    })
    
})
