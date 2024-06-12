import React from 'react'

const ActionList = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-col gap-4 my-6'>{children}</div>
  )
}

export default ActionList