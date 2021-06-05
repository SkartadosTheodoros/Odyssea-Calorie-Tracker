import { useState } from 'react';
import CaloriesInput from './components/CaloriesEntry/CaloriesInput';
import ErrorModal from './components/UI/ErrorModal';
import Navbar from './components/Navbar/Navbar';


function App() {

  //Add new entry
  const [data, setData] = useState([])
  const addEntryHandler = (entry)=>{
    setData((data) =>{return [...data, entry]})
    console.log(data)
  }

  //Error during input
  const [error, setError] = useState();
  const errorChangeHandler = ()=>{ 
    setError(true)
  }

  //close Modal
  const onDismissHandler = ()=>{ 
    setError(false)
  }

  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [login, setLogin] = useState(false)
  const loginChangeHandler = () => {
    setLogin(true);
  }

  

  return (
    <div className="App">
      {/* {login && <Modal></Modal>} */}
      {error && <ErrorModal title="Wrong Input" onDismiss={onDismissHandler}></ErrorModal>}
      <Navbar isLoggedIn={isLoggedIn} login={loginChangeHandler}/>
      <CaloriesInput addEntry={addEntryHandler} error={errorChangeHandler}/>
    </div >
  );
}

export default App;