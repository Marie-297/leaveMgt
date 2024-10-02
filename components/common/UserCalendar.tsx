'use client'
import Container from '@/components/common/Container';
import { daysOfTheWeek, getDays, months } from '@/lib/getDays';
import { cn } from '@/lib/utils';
import { Events } from '@prisma/client';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { User } from '@prisma/client';
import EventPopOver from '@/app/(dashboard)/dashboard/EventPop';
import Tooltip from './Tooltip';

type Props = {
  events: Events[]
  user: User;
}
type Holiday = {
  date: string; 
  name: string;
};

const UserCalendar = ({events, user}: Props) => {
  const currentDate = dayjs()
  const [holidays, setHolidays] = useState<any[]>([]);
  const [today, setToday] = useState(currentDate)
  const [hoveredHoliday, setHoveredHoliday] = useState<string | null>(null);
  const userEvents = events.filter(event => event.userEmail === user.email);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('/api/holiday', {
          method: 'GET',
      });
        if (!response.ok) {
          throw new Error('Failed to fetch holidays');
        }
        const data = await response.json();
        setHolidays(data);
      console.log('Holidays:', data); // Check the holidays fetched
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  fetchHolidays();
  }, []);

  const isHoliday = (date: dayjs.Dayjs) => {
    const holiday = holidays.find(holiday => {
      const holidayDate = dayjs(holiday.start);
      return holidayDate.isSame(date, 'day');
    });
    return holiday? { name: holiday.name, ...holiday } : false;
  };


  return (
    <Container>
        <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-950 text-white py-5 px-10 rounded-t-md  dark:bg-white dark:text-slate-950">
        <h1 className="select-none font-semibold">
          {months[today.month()]}, {today.year()}
        </h1>
        <div className="flex gap-10 items-center ">
          <IoMdArrowDropleft
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />
          <h1
            className=" cursor-pointer dark:text-slate-950 font-bold hover:scale-105 transition-all"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            Today
          </h1>
          <IoMdArrowDropright
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          />
        </div>
      </div>
      <section className="bg-white py-5 rounded-b-md dark:border dark:bg-black">
      <div className="grid grid-cols-7">
          {daysOfTheWeek.map((day, index) => {
            return (
              <h1
                key={index}
                className="h-10 font-bold grid place-content-center"
              >
                {day}
              </h1>
            );
          })}
        </div>
        
        <div className="grid grid-cols-7">
          {getDays(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
          const event = userEvents?.find(event => dayjs(event.startDate).isSame(date, 'day'));
          const holiday = isHoliday(date);

          return (
            <div key={index} className="h-10 grid place-content-center">
              {!event ?
                <h1 
                  className={cn(
                    !currentMonth && "text-slate-400",
                    today && "bg-blue-600 text-white ",holiday ? 'bg-orange-600 text-white':'text-slate-400',
                    "h-8 w-8 p-1 grid place-content-center font rounded-full cursor-pointer hover:bg-black hover:text-white dark:hover:bg-slate-500"
                  )}
                  onMouseEnter={() => {
                    if (holiday) {
                      setHoveredHoliday(holiday.name); 
                    }
                  }}
                  onMouseLeave={() => setHoveredHoliday(null)}
                >
                  {date.date()}{" "}
                </h1>
                : <EventPopOver event={event as Events} date={date.date()} />}
              
            </div>
          );
        })}
        </div>
      </section>
      

    </Container>
  )
}

  export default UserCalendar