import React from 'react';
import ReactDOM from 'react-dom';

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

const Poruka = ({poruka}) => {
  return (
    <li>{poruka.sadrzaj}</li>
  )
}

const App = ({poruke}) => {
  return (
    <div>
      <h1>Poruke</h1>
      <ul>
        {poruke.map(p =>
          <Poruka key={p.id} poruka={p} />
        )}        
      </ul>
    </div>
  )
}


ReactDOM.render(
  <App poruke={poruke} />,
  document.getElementById('root')
)