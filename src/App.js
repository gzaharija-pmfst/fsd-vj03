import React, { useState, useEffect } from 'react'
import Poruka from './components/Poruka'
import axios from 'axios'
import porukeServer from './services/poruke'

const App = () => {
  const [poruke, postaviPoruke] = useState([])
  const [unosPoruke, postaviUnos] = useState('unesi poruku...')
  const [ispisSve, postaviIspis] = useState(true)

  useEffect(() => {
    console.log("Effect hook");
    porukeServer
      .dohvatiSve()
      .then(response => {
        console.log("Promise fullfiled");
        postaviPoruke(response.data)
      })
  }, [])

  const porukeZaIspis = ispisSve
    ? poruke
    : poruke.filter(poruka => poruka.vazno === true)

  const novaPoruka = (e) => {
    e.preventDefault()
    console.log('Klik', e.target)
    const noviObjekt = {
      sadrzaj: unosPoruke,
      datum: new Date(),
      vazno: Math.random() > 0.5
    }
    porukeServer
      .stvori(noviObjekt)
      .then(response => {
        postaviPoruke(poruke.concat(response.data))
        postaviUnos('')
      })
  }

  const promjenaUnosa = (e) => {
    console.log(e.target.value);
    postaviUnos(e.target.value)
  }

  const promjenaVaznostiPoruke = (id) => {
    const poruka = poruke.find(p => p.id === id)
    const modPoruka = { ...poruka, vazno: !poruka.vazno }
    console.log("Promjena id", id)

    porukeServer
      .osvjezi(id, modPoruka)
      .then(response => {
        postaviPoruke(poruke.map(p => p.id !== id ? p : response.data))
      })
      .catch(error =>{
        alert(
          `Poruka "${poruka.sadrzaj}" je uklonjena sa poslužitelja`
        )
        postaviPoruke(poruke.filter(p => p.id !== id))
      })
  }
  return (
    <div>
      <h1>Poruke</h1>
      <div>
        <button onClick={() => postaviIspis(!ispisSve)}>
          Prikaži {ispisSve ? "važne" : "sve"}
        </button>
      </div>
      <ul>
        {porukeZaIspis.map(p =>
          <Poruka
            key={p.id}
            poruka={p}
            promjenaVaznosti={() => promjenaVaznostiPoruke(p.id)} />
        )}
      </ul>
      <form onSubmit={novaPoruka}>
        <input value={unosPoruke} onChange={promjenaUnosa} />
        <button type='submit'>Spremi</button>
      </form>
    </div>
  )
}

export default App