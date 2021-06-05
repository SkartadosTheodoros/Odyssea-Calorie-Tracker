import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Modal from './components/UI/Modal';

function App() {

  const [login, setLogin] = useState(false)
  const loginChangeHandler = () => {
    setLogin(true);
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      {login && <Modal></Modal>}
      <Navbar isLoggedIn={isLoggedIn} login={loginChangeHandler}></Navbar>
    </div >
  );
}

export default App;