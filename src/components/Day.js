import React from 'react'
import styled from 'styled-components'

import HourCell from './HourCell'
import Checkbox from './Checkbox'

const StyledDay = styled.div`
    display: flex;
    border: 1px solid #ccc;
    border-bottom: none;
    &:last-child{
        border-bottom: 1px solid #ccc;
    }
    & .week_day{
        display: flex;
        height: 50px;
        width: 50px;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #ccc;
        user-select: none;
        &.active{
            background-color: #e4e4e4;
        }
    }
    & .cells_wrapper{
        width: calc(100% - 100px);
    }
`

const toHours = minutes => Math.ceil(minutes / 60)

class Day extends React.Component {
    booleanData = []

    dataToObjects = () => {
        const result = []
        var minutes = 0

        for (let i = 0, j = -1; i < 24; i++) {
            if (this.booleanData[i]) {
                minutes = i * 60
                if (this.booleanData[i - 1]) {
                    result[j] = { bt: result[j].bt, et: minutes + 59 }
                }
                else {
                    result.push({ bt: minutes ? minutes : 0, et: minutes + 59 })
                    ++j
                }
            }
        }

        return result
    }

    handleChange = (value) => {
        this.booleanData.fill(value)
        this.props.checkAll(this.dataToObjects())
    }

    cellClick = time => {
        this.booleanData = this.booleanData.map((el, i) => i == time ? !el : el)
        this.props.checkCell(this.dataToObjects())
    }

    handleMouseDown = (i) => {
        if(!this.booleanData[i]){
            this.props.onMouseDown()
        }
    }

    handleMouseOver = (time) => {
        if(!this.booleanData[time]){
            this.booleanData[time] = true
            this.props.onMouseOver(this.dataToObjects())
        }
    }

    render() {
        this.booleanData.splice(0)
        const data = this.props.data
        var isActive = false

        for (let i = 0, j = 0; i < 24; i++) {
            if (data.length) {
                isActive = toHours(data[j].bt) <= i && toHours(data[j].et) > i ? true : false
                j = toHours(data[j].et) <= i && data[j + 1] ? ++j : j
            }
            this.booleanData.push(isActive)
        }

        return (
            <StyledDay>
                <div className={`week_day ${this.booleanData.every(el => el) ? 'active' : ''}`}>{this.props.day.toUpperCase()}</div>
                <Checkbox checked={this.booleanData.every(el => el)} onChange={value => this.handleChange(value)} />
                <div className='cells_wrapper'>
                    {this.booleanData.map((el, i) => <HourCell
                        isMouseDown={this.props.isMouseDown}
                        onMouseDown={() => { this.handleMouseDown(i)}}
                        onMouseUp={this.props.onMouseUp}
                        onMouseOver={ () => { this.handleMouseOver(i) }}
                        onClick={time => this.cellClick(time)}
                        time={i} active={el} key={i}>
                    </HourCell>)}
                </div>
            </StyledDay>
        )
    }
}

export default Day