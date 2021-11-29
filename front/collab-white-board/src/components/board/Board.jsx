import React, { useState, useEffect } from 'react'
import './style.css'

const Board = () => {

    let timeout;

    useEffect(() => {
        draw();
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
            })
        };
    }

    return(
        <div className="canvas" id="canvas">
            <canvas className="boardCanvas" id="boardCanvas"/>
        </div>
    )
}

export default Board