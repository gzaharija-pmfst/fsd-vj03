import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Poruka from './components/Poruka'

const poruke = [
  {
    id: 1,
    sadrzaj: 'HTML je jednostavan',
    datum: '2019-05-30T17:30:31.098Z',
    vazno: true
  },
  {
    id: 2,
    sadrzaj: 'React koristi JSX sintaksu',
    datum: '2019-05-30T18:39:34.091Z',
    vazno: false
  },
  {
    id: 3,
    sadrzaj: 'GET i POST su najvaznije metode HTTP protokola',
    datum: '2019-05-30T19:20:14.298Z',
    vazno: true
  }
]
const App = (props) => {
  const [ poruke, postaviPoruke] = useState(props.poruke)
  const [unosPoruke, postaviUnos] = useState('unesi poruku...')
  const [ispisSve, postaviIspis] = useState(true)

  const porukeZaIspis = ispisSve
  ? poruke
  : poruke.filter(p => p.vazno === true)

  const novaPoruka = (e) => {
    e.preventDefault()
    console.log('Klik', e.target)
    const noviObjekt = {
      id: poruke.length + 1,
      sadrzaj: unosPoruke,
      datum: new Date().toISOString(),
      vazno: Math.random() > 0.5
    }
    postaviPoruke(poruke.concat(noviObjekt))
    postaviUnos('')
  }
  const promjenaUnosa = (e) => {
    console.log(e.target.value)
    postaviUnos(e.target.value)
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
          <Poruka key={p.id} poruka={p} />
        )}        
      </ul>
      <form onSubmit={novaPoruka}>
        <input value={unosPoruke} onChange={promjenaUnosa} />
        <button type='submit'>Spremi</button>
      </form>
    </div>
  )
}

ReactDOM.render(<App poruke={poruke} />,document.getElementById('root'))
