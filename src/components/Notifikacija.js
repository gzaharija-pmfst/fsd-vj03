import React from 'react'

const Notifikacija = ({poruka}) => {
  if (poruka === null) {
    return null
  }

  return (
    <div className="greska">
      {poruka}
    </div>
  )
}

export default Notifikacija