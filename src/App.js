import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ErrorModal from './components/UI/ErrorModal';
import CaloriesInput from './components/CaloriesInput/CaloriesInput';
import Calories from './components/CaloriesList/Calories';


function App() {

  const startData = [
    {
      id: 1,
      date: new Date().toLocaleString(),
      meal: "tomato",
      quantity: "250g",
      calories: "1586"
    }
  ]

  //Add new entry
  const [data, setData] = useState(startData)
  const addEntryHandler = (entry) => {

    if (entry.meal.trim().length === 0) {
      setError("Meal is mandatory")
      return false;
    }

    // feach data from api
    const newEntry = {
      id: entry.id,
      date: entry.date,
      meal: entry.meal,
      quantity: "100gr",
      calories: "1000kcal"
    }

    setData((data) => { return [...data, newEntry] })
    console.log(data);
    return true;
  }

  //Error during input
  const [error, setError] = useState();
  const errorChangeHandler = () => {
    setError(true)
  }

  //close Modal
  const onDismissHandler = () => {
    setError(false)
  }

  //edit entry

  // delete entry

  // check if user is log in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // register

  // log in
  const [login, setLogin] = useState(false)
  const loginChangeHandler = () => {
    setLogin(true);
  }

  // log out

  return (
    <div className="App">
      {error && <ErrorModal title="Wrong Input" onDismiss={onDismissHandler}></ErrorModal>}
      <Navbar isLoggedIn={isLoggedIn} login={loginChangeHandler} />
      <CaloriesInput addEntry={addEntryHandler} error={errorChangeHandler} />
      <Calories data={data} />
    </div >
  );
}

export default App;