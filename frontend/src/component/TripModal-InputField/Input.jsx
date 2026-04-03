import React from 'react'

const Input = ({label, value}) => {
  return (
    <div className='flex justify-start gap-5'>
        <span className='text-gray-500 font-medium'>{label} :</span>
        <span>{value}</span>
    </div>
  )
}

export default Input