import React from 'react'

type TableProps = {
    title: string;
    buttonA: React.ReactNode;
    buttonB: React.ReactNode;
    children: React.ReactNode;
  };
  
  const TableWrapper = ({ title, buttonA, buttonB, children }: TableProps) => {
    return (
      <div className="  rounded-lg shadow-md px-6 my-12 max-h-[80vh] overflow-y-auto bg-white dark:bg-black">
        <div className="flex justify-between py-5 px-10 sticky top-0 z-10 bg-white  dark:bg-slate-900">
            {buttonA && <div>{buttonA}</div>}
            <h2 className="text-2xl text-center font-bold tracking-tight">
             {title}
            </h2>
            {buttonB && <div>{buttonB}</div>}
          </div>
  
        <div className="relative overflow-x-auto  ">{children}</div>
      </div>
    );
  };
  
  export default TableWrapper;