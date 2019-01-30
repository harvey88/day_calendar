import React from 'react'
import styled from 'styled-components'

const StyledHourCell = styled.div`
    display: inline-block;
    width: ${100 / 24}%;
    height: 100%;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    cursor: pointer;
    transition: background .2s ease-in-out;
    &:last-child{
        border-right: none;
    }
    &.active{
        background-color: #666;
    }
    &:not(.active):hover{
        background-color: #e4e4e4;
    }
`

class HourCell extends React.Component {

    handleClick = (time) => {
        this.props.onClick(time)
    }

    render() {
        return (
            <StyledHourCell
                onMouseOver={ () => {if(this.props.isMouseDown){this.props.onMouseOver()}}}
                onMouseUp={this.props.onMouseUp}
                onMouseDown={this.props.onMouseDown}
                onClick={() => this.handleClick(this.props.time)}
                className={this.props.active ? 'active' : ''}>{this.props.children}</StyledHourCell>
        )
    }
}

export default HourCell