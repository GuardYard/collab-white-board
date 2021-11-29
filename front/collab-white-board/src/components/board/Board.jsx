import React, { useEffect } from 'react'
import io from 'socket.io-client'
import './style.css'

const Board = () => {

    let timeout;
    const socket = io("http://localhost:5000");

    useEffect(() => {
        draw();
        socket.emit("reply");
        socket.on("canvas", (data) => {
            let img = new Image();
            let canvas = document.querySelector('#boardCanvas');
            let ctx = canvas.getContext('2d');
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
            };
            img.src = data;
        })
    }, [])

    const draw = () => {
        let canvas = document.querySelector('#boardCanvas');
        let ctx = canvas.getContext('2d');
        let sketch = document.querySelector('#canvas');
        let sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
        let mouse = {x: 0, y: 0};
        let last_mouse = {x: 0, y: 0};

        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        let onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if(timeout !== undefined){
                clearTimeout(timeout);
            }
            timeout = setTimeout(()=>{
                let b64ID = canvas.toDataURL("image/png");
                socket.emit("canvas-data", b64ID);
                console.log("555")
            }, 1000)
        };
    }

    return(
        <div className="canvas" id="canvas">
            <canvas className="boardCanvas" id="boardCanvas"/>
        </div>
    )
}

export default Board