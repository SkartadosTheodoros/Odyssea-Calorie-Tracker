import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ErrorModal from './components/UI/ErrorModal';
import CaloriesInput from './components/CaloriesInput/CaloriesInput';
import CaloriesFilter from './components/CaloriesFilter/CaloriesFilter';
import Calories from './components/CaloriesList/Calories';

function App() {

  const startData = [
    {
      id: 1,
      date: new Date(),
      name: "dddd",
      meal: "breakfast",
      quantity: "250g",
      calories: 1586
    },
    {
      id: 2,
      date: new Date(),
      name: "dfgvbdf",
      meal: "breakfast",
      quantity: "250g",
      calories: 1586
    },
    {
      id: 12,
      date: new Date(),
      name: "dfgvbdf",
      meal: "lunch",
      quantity: "250g",
      calories: 1586
    },
    {
      id: 222,
      date: new Date(),
      name: "dfgvbdf",
      meal: "meal",
      quantity: "250g",
      calories: 1586
    },
    {
      id: 3,
      date: new Date(),
      name: "tggggomato",
      meal: "breakfast",
      quantity: "250g",
      calories: 1586
    },
    {
      id: 4,
      date: new Date(),
      name: "tomato",
      meal: "breakfast",
      quantity: "250g",
      calories: 1586
    }
  ]

  //Add new entry
  const [data, setData] = useState(startData)
  const addEntryHandler = (entry) => {

    if (entry.name.trim().length === 0 ) {
      setError("Meal is mandatory")
      return false;
    }

    // feach data from api
    const newEntry = {
      id: entry.id,
      date: entry.date,
      name: entry.name,
      meal: entry.meal,
      quantity: "100gr",
      calories: 1000
    }

    setData((data) => { return [...data, newEntry] })
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

  const today = () => {
    let today = new Date()
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    return year + '-' + month + '-' + day;
  }

  // date filter
  const [startDate, setStartDate] = useState(today())
  const newStartDateSetHandler = (startDate) => {
    setStartDate(startDate);
  }

  // typefilter
  const [meal, setMeal] = useState("all")
  const newSetMealTypeSetHandler = (meal) => {
    setMeal(meal);
  }

  const [mealTypes, setMealTypes] = useState([])

  const UniqueMealType = (date) => {
    let types = data.map(item => {
      return (
        item.date.getDate() === date.getDate()
          ? item.meal
          : null)
    })

    types = types.filter((item, idx) => types.indexOf(item) === idx)
    return types
  }

  useEffect(() => {
    setMealTypes(
      UniqueMealType(new Date(startDate))
    )
  }, [data])

  const findUniqueMealTypeHandler = (date) => {
    setMealTypes(
      UniqueMealType(new Date(date))
    )
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
      {error && <ErrorModal title={error} onDismiss={onDismissHandler}></ErrorModal>}
      <Navbar
        isLoggedIn={isLoggedIn}
        login={loginChangeHandler} />
      <CaloriesInput
        addEntry={addEntryHandler}
        error={errorChangeHandler} />
      <CaloriesFilter
        startDate={startDate}
        meal={meal}
        mealType={mealTypes}
        onSetStartDate={newStartDateSetHandler}
        onSetMealType={newSetMealTypeSetHandler}
        onMealTypes={findUniqueMealTypeHandler} />
      <Calories
        filterDate={startDate}
        filterMeal={meal}
        data={data} />
    </div >
  );
}

export default App;