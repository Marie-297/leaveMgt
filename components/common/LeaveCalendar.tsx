'use client'
import Container from '@/components/common/Container';
import { daysOfTheWeek, getDays, months } from '@/lib/getDays';
import { cn } from '@/lib/utils';
import { Events } from '@prisma/client';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import EventPopOver from './EventPop';
import UpcomingEvent from './UpcomingEvent';

type Props = {
  events: Events[]
}
const LeaveCalendar = ({events}: Props) => {
    const currentDate = dayjs()

    const [today, setToday] = useState(currentDate)
    


  return (
    <Container>
      <div className='flex'>
        <div className='w-[70%]'>
          <div className="flex flex-col sm:flex-row justify-between items-center text-slate-50 bg-slate-950 py-5 px-10 rounded-t-md font-semibold  dark:bg-gray-100 dark:text-slate-950">
            <h1 className='font-extrabold font-poppins text-3xl'>Calendar</h1>
            <h1 className="select-none">
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
                className=" cursor-pointer hover:scale-105 transition-all"
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
          <section className="bg-white py-5 rounded-b-md dark:border dark:bg-black border-2">
            <div className="grid grid-cols-7">
              {daysOfTheWeek.map((day, index) => {
                return (
                  <h1
                    key={index}
                    className="h-10 font-bold grid place-content-center border-x-2"
                  >
                    {day}
                  </h1>
                );
              })}
            </div>
          
            <div className="grid grid-cols-7">
              {getDays(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
                const event = events?.find(event => dayjs(event.startDate).isSame(date, 'day'));
                return (
                  <div key={index} className="h-16 grid place-content-start border-x-2 border-t-2">
                    {!event ?
                      <h1 
                        className={cn(
                          !currentMonth && "text-slate-400",
                          today && "bg-blue-600 text-white ",
                          "h-6 w-6 p-1 grid place-content-center font rounded-full cursor-pointer hover:bg-black hover:text-white dark:hover:bg-slate-500"
                        )}
                      >
                        {date.date()}{" "}
                      </h1>
                      : <EventPopOver event={event as Events} date={date.date()} />}
                    
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <section className='w-[30%]'>
          <UpcomingEvent events={events} />
        </section>
      </div>
     

    </Container>
  )
}

export default LeaveCalendar