import React, { useState, useMemo } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {format, addDays, subDays} from 'date-fns';
import pt from 'date-fns/locale/pt'

import { Container, Time } from './styles';
import api from '../../services/api';

function Dashboard() {

    const [date, setDate] = useState(new Date());

    const formatDate = useMemo(() => 
        format(date, "d 'de' MMMM", { locale: pt })
        , [date]
    )

    function handleAddDay(){
        setDate(addDays(date, 1))
    }

    function handleSubDay(){
        setDate(subDays(date, 1));
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={handleSubDay}>
                    <MdChevronLeft size={36} color="#fff" />
                </button>
                <strong>{formatDate}</strong>
                <button type="button" onClick={handleAddDay}>
                    <MdChevronRight size={36} color="#fff" />
                </button>
            </header>

            <ul>
                <Time past={true}>
                    <strong>08:00</strong>
                    <span>Mario Alfredo Jorge</span>
                </Time>
                <Time available={true}>
                    <strong>09:00</strong>
                    <span>Mario Alfredo Jorge</span>
                </Time>
                <Time>
                    <strong>10:00</strong>
                    <span>Mario Alfredo Jorge</span>
                </Time>
                <Time>
                    <strong>11:00</strong>
                    <span>Mario Alfredo Jorge</span>
                </Time>
            </ul>
        </Container>
    );
}

export default Dashboard;
