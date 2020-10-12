import React, {useState} from 'react'
import Poruka from './components/Poruka'

const App = (props) => {
  const [ poruke, postaviPoruke] = useState(props.poruke)

  const novaPoruka = (e) => {
    e.preventDefault()
    console.log('Klik', e.target)
  }
  return (
    <div>
      <h1>Poruke</h1>
      <ul>
        {poruke.map(p =>
          <Poruka key={p.id} poruka={p} />
        )}        
      </ul>
      <form onSubmit={novaPoruka}>
        <input />
        <button type='submit'>Spremi</button>
      </form>
    </div>
  )
}

export default App