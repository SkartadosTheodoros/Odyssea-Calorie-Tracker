import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ErrorModal from './components/UI/ErrorModal';
import CaloriesInput from './components/CaloriesInput/CaloriesInput';
import CaloriesFilter from './components/CaloriesFilter/CaloriesFilter';
import Calories from './components/CaloriesList/Calories';

function App() {

  const today = () => {
    let today = new Date()
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    return year + '-' + month + '-' + day;
  }

  //States
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(today())
  const [search, setSearch] = useState("")
  const [type, setType] = useState("all")
  const [typeList, setTypesList] = useState([])
  const [error, setError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //Add new entry
  const addEntryHandler = (entry) => {
    if (entry.query.trim().length === 0) {
      setError("Meal is mandatory")
      return false;
    }

    fetch('https://api.calorieninjas.com/v1/nutrition?query=' + entry.query,
      {
        method: 'GET',
        url: 'https://api.calorieninjas.com/v1/nutrition?query=' + entry.query,
        headers: { 'X-Api-Key': 'EXZJmSfKrzCjfD5csKLGQQ==3snCEmEYJFlGVzjc' },
        contentType: 'application/json',
      })
      .then(response => response.json())
      .then(jsonData => {
        jsonData.items.map(item => {
          const newEntry = {
            id: uuidv4(),
            date: entry.date,
            meal: item.name,
            type: entry.type,
            quantity: String(item.serving_size_g) + "g",
            calories: item.calories
          }
          setData((data) => { return [...data, newEntry] })
        })
      })

      console.log(data)
    return true;
  }

  //Error Modal
  const errorChangeHandler = () => {
    setError(true)
  }

  //Close Error Modal
  const onDismissHandler = () => {
    setError(false)
  }

  //edit entry








  // delete entry
  const deleteHandler = (id) => {
    const newData = data.filter((entry) => entry.id !== id);
    setData(newData);;
  };

  // set date for filterimg 
  const newStartDateSetHandler = (startDate) => {
    setStartDate(startDate);
  }

  // set filter type
  const newSetTypeSetHandler = (type) => {
    setType(type);
  }

  // filter type list
  const newSetTypeListSetHandler = (date) => {
    date = new Date(date)

    let uniqueTypes = data.map(item => {
      return (item.date.getDate() === date.getDate() ? item.type : null)
    })

    uniqueTypes = uniqueTypes.filter((item, idx) => {
      return (uniqueTypes.indexOf(item) === idx && item != null)
    })

    setTypesList(uniqueTypes.sort())
  }

  // filter type list on load
  useEffect(() => {
    newSetTypeListSetHandler(new Date(startDate))
  }, [data])

  const searchChangeHandler = (entry) =>{
    entry === undefined ? setSearch("") : setSearch(entry);
  }




  // check if user is log in
  // register
  // log in
  // log out























  return (
    <div className="App">
      {error && <ErrorModal title={error} onDismiss={onDismissHandler}></ErrorModal>}

      <Navbar
        isLoggedIn={isLoggedIn} />

      <CaloriesInput
        addEntry={addEntryHandler}
        error={errorChangeHandler} />

      <CaloriesFilter
        search={search}
        startDate={startDate}
        typeList={typeList}
        onSetSearch = {searchChangeHandler}
        onSetType={newSetTypeSetHandler}
        onSetStartDate={newStartDateSetHandler}
        onSetTypeList={newSetTypeListSetHandler} />

      <Calories
        data={data}
        filterSearch={search}
        filterDate={startDate}
        filterType={type}
        onDelete={deleteHandler} />
    </div >
  );
}

export default App;