client = io.connect('http://192.168.0.31:4400')
client.on('connect',()=>{

})
let mouse = {
    x:0,
    y:0,
    delta:{x:0,y:0},
    interpolation:5,
    scaleX:4.2,
    scaleY:3.9
}
function setup(){
    createCanvas(windowWidth, windowHeight) 
    client.emit('iam',true)
}
function draw(){
}

function mousePressed(){
    mouse.delta.x = mouse.x-mouseX*mouse.scaleX
    mouse.delta.y = mouse.y-mouseY*mouse.scaleY

}
function mouseDragged(){
    mouse.x += ((mouseX*mouse.scaleX+mouse.delta.x)-mouse.x)/1
    mouse.y += ((mouseY*mouse.scaleY+mouse.delta.y)-mouse.y)/1
    client.emit('mdata',{x:Math.round(mouse.x),y:Math.round(mouse.y)})
}

