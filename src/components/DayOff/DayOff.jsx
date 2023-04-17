import React from 'react'
import DayOffTable from '../DayOffTable/DayOffTable'
const DayOff = ({columns}) => {
  return (
    <div className="request">
      <div className="requestContainer">
        <DayOffTable columns={columns}/>
      </div>
    </div>
  )
}

export default DayOff