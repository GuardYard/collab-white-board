import React from 'react'
import Board from "../../components/board/Board"

import './style.css';

const BoardContainer = () => {
    return(
        <div className="container">
            <div className="color-picker-container">
                <input type="color"/>
            </div>
            <div className="boardContainer">
                <Board/>
            </div>
        </div>
    )
}

export default BoardContainer