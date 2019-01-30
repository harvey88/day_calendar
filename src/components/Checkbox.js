import React from 'react'
import styled from 'styled-components'

import { FaCheck } from "react-icons/fa";

const StyledCheckbox = styled.div`
    display: flex;
    height: 50px;
    width: 50px;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ccc;
    background-color: #333;
    cursor: pointer;
    & span{
        font-size: 0;
        color: #fff;
        transition: all .1s ease-in-out;
    }
    &.checked span{
        font-size: 20px;
    }
`

class Checkbox extends React.Component {
    state = { checked: this.props.checked }

    handleClick = () => {
        this.props.onChange(!this.props.checked)
    }

    render() {
        return (
            <StyledCheckbox className={this.props.checked ? 'checked' : ''} onClick={this.handleClick}><span><FaCheck /></span></StyledCheckbox>
        )
    }
}

export default Checkbox