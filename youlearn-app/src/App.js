import './App.css';
import Header from './Header';

import axios from 'axios';

axios.get('http://localhost:8080/')
  .then(response => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function App() {
  return (
    <div className="App">
      <Header />
      <main>

      </main>
    </div>
  );
}

export default App;
