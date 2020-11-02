

const createIoServer = server =>{
    const io = require('socket.io')(server);

    io.on('connection', socket=>{
        console.log('a user connected', socket);
    });

};

module.exports = createIoServer;

