import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserDetails from './components/UserDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/userdetails' element={<UserDetails />} />
      </Routes>
    </>
  );
}

export default App;
