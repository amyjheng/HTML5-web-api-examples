const WebSocket = require('ws');

const createChatServer = server =>{
    const wsServer = new WebSocket.Server({server});
    const map = new Map();
    wsServer.on('connection', (ws, req)=>{
        console.log(req.url);
        map.set(ws, {name:''});
        // console.log('size:', wsServer.clients.size);
        // console.log('ip:', req.connection.remoteAddress);
        ws.on('message', msg =>{
            const mObj = map.get(ws);
            let output;
            if(! mObj.name){
                mObj.name = msg;
                output = `${mObj.name} 進來了, 人數: ${wsServer.clients.size}`;
            } else {
                output = `${mObj.name}: ${msg}`;
            }

            wsServer.clients.forEach(c => {
                if(c.readyState===WebSocket.OPEN){
                    c.send(output);
                }
            });
        });
        ws.send('連線了');
    });
};

module.exports = createChatServer;

