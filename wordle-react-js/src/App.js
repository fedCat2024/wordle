import Wordle from './Wordle';
import './App.css';

function App() {
  const targetWord = 'apple';
  const maxTries = 6;
  return (
    <div className="App">
      <header className="App-header">Wordle</header>
      <Wordle targetWord={targetWord} maxTries={maxTries} />
    </div>
  );
}

export default App;
