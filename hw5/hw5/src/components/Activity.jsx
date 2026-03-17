import React from 'react'
import "./Activity.css"

const Activity = () => {
  return (
    <div className='activity'>
    <div className='content-container'>
        <h3 className='name'>ส่งการบ้าน</h3>
        <h3 className='date'>08:00 20-03-2026</h3>
    </div>
    <div className='button-container'>
        <button className='edit'>Edit</button>
        <button className='remove'>Remove</button>
    </div>
    </div>
  )
}

export default Activity