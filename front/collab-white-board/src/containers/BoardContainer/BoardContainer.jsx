import React from 'react';


import './style.css';
import Board from "../../components/board/Board";

class Container extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            color: "black",
            size: "10"
        }
    }

    handleSizeChange(newSize) {
        this.setState({
            size: newSize.target.value
        })
    }
    handleColorChange(newColor) {
        this.setState({
            color: newColor.target.value
        })
    }

    render() {

        return (
            <div className="container">
                <div className="tools-section">
                    <div className="color-picker-container">
                        Size : &nbsp;&nbsp;&nbsp;
                        <input type="color" value={this.state.color} onChange={this.handleColorChange.bind(this)}/>
                    </div>
                    <div className="size">
                        Size : &nbsp;&nbsp;&nbsp;
                        <select value={this.state.size} onChange={this.handleSizeChange.bind(this)}>
                            <option> 10 </option>
                            <option> 15 </option>
                            <option> 20 </option>
                            <option> 25 </option>
                            <option> 30 </option>
                        </select>
                    </div>

                </div>

                <div className="board-container">
                    <Board color={this.state.color} size={this.state.size}/>
                </div>
            </div>
        )
    }
}

export default Container