import logo from './logo.svg';
import './App.css';
import Restaurante from './components/Restaurante';

//vector de objetos de tipo restaurantes
const restaurantes=[
  {nombre:"Restaurante pizz HUT", descripcion:"michi pizza 1"},
  {nombre:"Restaurante pizz HUT", descripcion:"michi pizza 2"},
  {nombre:"Restaurante pizz HUT", descripcion:"michi pizza 3"},
  {nombre:"Restaurante pizz Steven", descripcion:"michi pizza 4"}
];

function App() {
  return (
    <div className="App">
      {
        restaurantes.map((r,i)=>
          <Restaurante key={i} nombre={r.nombre} descripcion={r.descripcion}></Restaurante>
        

        )
      }

      
  
    </div>
  );
}

export default App;
