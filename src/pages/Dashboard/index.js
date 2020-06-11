import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, getHours, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Container, Time } from './styles';
import api from '~/services/api';

function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const { data: response } = await api.get('schedule', {
        params: { date },
      });
      const responseFormatted = response.map((r) => ({
        ...r,
        formattedDate: `${getHours(parseISO(r.date))}:00h`,
      }));
      setSchedule(responseFormatted);
    }
    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map((t) => (
          <Time key={t.date} past={t.past} avaliable={t.avaliable}>
            <strong>{t.formattedDate}</strong>
            <span>{t.user ? t.user.name : 'Em aberto'}</span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;
