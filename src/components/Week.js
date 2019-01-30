import React from 'react'
import styled from 'styled-components'

import Day from './Day'
import ScaleCell from './ScaleCell'

import data from '../data.json'

const weekDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
const scaleHours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']

const Scale = styled.div`
    margin-left: 51px;
    margin-top: 20px;
    display: flex;
    & .all_day{
        display: flex;
        width: 50px;
        height: 50px;
        justify-content: center;
        align-items: center;
    }
    & .scale_cells{
        width: calc(100% - 50px);
        display: flex;
        align-items: flex-end;
    }
`

const ButtonWrapper = styled.div`
    text-align: right;
    margin-top: 15px;
    margin-bottom: 20px;
`

const Button = styled.button`
    border: none;
    padding: 6px 16px;
    color: #fff;
    background-color: #666;
    margin-left: 15px;
    cursor: pointer;
`

class Week extends React.Component {
    constructor() {
        super()
        this.state = { 
            data: data,
            isMouseDown: false
        }
    }

    checkAll = (day, value) => {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [day]: value
            }
        }))
    }

    checkCell = (day, data) => {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [day]: data
            }
        }))
    }

    handleMouseOver = (day, data) => {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [day]: data
            }
        }))
    }

    handleMouseDown = () => {
        this.setState({ isMouseDown: true })
    }

    handleMouseUp = () => {
        this.setState({ isMouseDown: false })
    }

    handleClear = () => {
        var newState = {}
        weekDays.forEach(el => { newState[el] = [] })
        this.setState({ data: newState })
    }

    render() {
        return (
            <div>
                <Scale>
                    <div className='all_day'>ALL <br /> DAY</div>
                    <div className='scale_cells'>{scaleHours.map((el, i) => <ScaleCell key={i} content={el} />)}</div>
                </Scale>
                <div>
                    {weekDays.map(el => <Day
                        isMouseDown={this.state.isMouseDown}
                        onMouseUp={this.handleMouseUp}
                        onMouseDown={this.handleMouseDown}
                        onMouseOver={(data) => this.handleMouseOver(el, data)}
                        checkCell={(data) => this.checkCell(el, data)}
                        checkAll={(value) => this.checkAll(el, value)}
                        data={this.state.data[el]}
                        key={el}
                        day={el} />)}
                </div>
                <ButtonWrapper>
                    <Button onClick={this.handleClear}>Clear</Button>
                    <Button onClick={() => this.props.onSave(this.state.data)}>Save Changes</Button>
                </ButtonWrapper>
            </div>
        )
    }
}

export default Week