const express = require('express');
var robot = require("robotjs")
const app = express();
const port = 4400;
let fs =require('fs')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var screenshot = require('desktop-screenshot');


app.get('/', (req, res) => res.sendFile(__dirname+`/index.html`))
app.get('/socket.io-client.js', (req, res) => res.sendFile(__dirname+'/socket.io-client.js'))
app.get('/logic.js', (req, res) => res.sendFile(__dirname+'/logic.js'))

robot.setMouseDelay(0)
let sock
let localmouse = {x:0,y:0,wx:0,wy:0}
io.on('connection',(socket)=>{
    
    socket.on('iam',()=>{
        sock = socket
        console.log('got socket')
    })
    socket.on('mdata',(data)=>{
        localmouse.wx = data.x
        localmouse.wy = data.y
        
    })
    socket.on('redirect',(data)=>{
        if(sock){
            sock.emit('screen',data)
        }
    })

})
setInterval(()=>{
    localmouse.x +=(localmouse.wx-localmouse.x)/3
    localmouse.y +=(localmouse.wy-localmouse.y)/3
    if(Math.abs(localmouse.wx-localmouse.x)>1||Math.abs(localmouse.wy-localmouse.y)>1){
        robot.moveMouse(localmouse.x, localmouse.y);
    }
    
})


http.listen(4400, function(){
    console.log('working');
});
