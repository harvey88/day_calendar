import React from 'react'
import styled from 'styled-components'

const StyledScaleCell = styled.div`
    width: ${100/8 - 0.03}%;
    height: 20px;
    box-sizing: border-box;
    border-left: 1px solid #ccc;
    position: relative;
    & span{
        position: absolute;
        top: -110%;
        font-size: 14px;
    }
`

class HourCell extends React.Component{
    render(){
        return(
            <StyledScaleCell><span>{this.props.content}</span></StyledScaleCell>
        )
    }
}

export default HourCell