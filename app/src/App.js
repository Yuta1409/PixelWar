import React, {useState} from 'react';
import './App.css';
import CanvasComponent from './components/script';

function App() {
  const [color, setColor] = useState('#000000'); // État pour la couleur

  return (
      <div className="App">
          <header className="App-header">
              <h1 className="text-3xl font-bold underline">Pixel War</h1>
              <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className="mt-4 p-2 border rounded"
              />
              <div className="mt-4 p-4 border-2 border-gray-300">
                  <CanvasComponent scolor={color} /> {/* Passer la couleur au composant */}
              </div>
          </header>
      </div>
  );
}

export default App;