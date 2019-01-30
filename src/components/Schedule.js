import React from 'react'

import Week from './Week'

import styled from 'styled-components'
import { injectGlobal } from 'styled-components'

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&subset=cyrillic');
    body{
        margin: 0;
        padding: 0;
        font-family: 'Roboto';
    }
`

const ScheduleContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
`

class Schedule extends React.Component{
    render(){
        return(
            <ScheduleContainer>
                <Week onSave={data => { console.log(JSON.stringify(data)) }}/>
            </ScheduleContainer>
        )
    }
}

export default Schedule