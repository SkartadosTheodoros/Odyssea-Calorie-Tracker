import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ErrorModal from './components/UI/ErrorModal';
import CaloriesInput from './components/CaloriesInput/CaloriesInput';
import CaloriesFilter from './components/CaloriesFilter/CaloriesFilter';
import Calories from './components/CaloriesList/Calories';

function App() {

  //Add new entry
  const [data, setData] = useState([])
  const addEntryHandler = (entry) => {

    if (entry.query.trim().length === 0) {
      setError("Meal is mandatory")
      return false;
    }

    let query = entry.query;
    fetch('https://api.calorieninjas.com/v1/nutrition?query=' + query,
      {
        method: 'GET',
        url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
        headers: { 'X-Api-Key': 'EXZJmSfKrzCjfD5csKLGQQ==3snCEmEYJFlGVzjc' },
        contentType: 'application/json',
      })
      .then(response => response.json())
      .then(jsonData => {
        jsonData.items.map(item => {
          const newEntry = {
            id: uuidv4(),
            date: entry.date,
            name: item.name,
            meal: entry.meal,
            quantity: String(item.serving_size_g) + "g",
            calories: item.calories
          }

          setData((data) => { return [...data, newEntry] })
        })
      })
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