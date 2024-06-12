import React from 'react'
import DateLog from './DateLog'

const DateLogList = ({date}: {date: string}) => {
    const randSizeArr = Array(Math.ceil(Math.random() * 10)).fill(null)
    console.log(randSizeArr)
  return (
    <div className='mt-4'>
        <h2 className='font-semibold text-xl'>{date}</h2>
        <div className='flex flex-col gap-3'>
            {randSizeArr.map((ele, idx) => (<DateLog/>))}
        </div>
    </div>
  )
}

export default DateLogList