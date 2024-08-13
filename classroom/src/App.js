import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import MainArea from './components/MainArea';

function App() {
  return (
    <div className="App  bg-slate-100 flex justify-center items-center h-[100vh] w-[100vw]  ">
      <div className='flex'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main/*' element={<MainArea/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
