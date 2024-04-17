import Wordle from './Wordle';
import './App.css';

function App() {
  const targetWord = 'apple'; // 目标单词
  const maxTries = 6; // 最大尝试次数
  return (
    <div className="App">
      <header className="App-header">Wordle</header>
      <Wordle targetWord={targetWord} maxTries={maxTries} />
    </div>
  );
}

export default App;
