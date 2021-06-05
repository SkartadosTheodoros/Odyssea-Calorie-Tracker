import { useState } from 'react';
import CaloriesInput from './components/CaloriesEntry/CaloriesInput';
import Navbar from './components/Navbar/Navbar';
import Modal from './components/UI/Modal';

function App() {

  const [data, setData] = useState([])
  const addEntryHandler = (entry)=>{
    setData((data) =>{return [...data, entry]})
    console.log(data)
  }







  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [login, setLogin] = useState(false)
  const loginChangeHandler = () => {
    setLogin(true);
  }

  

  return (
    <div className="App">
      {login && <Modal></Modal>}
      <Navbar isLoggedIn={isLoggedIn} login={loginChangeHandler}/>
      <CaloriesInput addEntry={addEntryHandler}/>
    </div >
  );
}

export default App;