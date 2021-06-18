import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ErrorModal from './components/UI/ErrorModal';
import CaloriesInput from './components/CaloriesInput/CaloriesInput';
import CaloriesFilter from './components/CaloriesFilter/CaloriesFilter';
import Calories from './components/CaloriesList/Calories';
import DailyCalories from "./components/DailyCalories/DailyCalories";
import EditCaloriesInput from "./components/EditCaloriesInput/EditCaloriesInput";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Loading from "./components/UI/Loading";

function App() {

  const globalCaloriesLimit = 1500

  // This function returns current date in string format
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
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState(false);
  const [type, setType] = useState("all")
  const [typeList, setTypesList] = useState([])
  const [error, setError] = useState();
  const [login, setLogin] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(false);
  const [register, setRegister] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [caloriesLimit, setCaloriesLimit] = useState()
  const [isLoading, setIsLoading] = useState(false)


  //Add new entry
  const addEntryHandler = (entry) => {
    if (entry.query.trim().length === 0) {
      const status = {
        status: "Meal is mandatory",
        message: "Meal Wrong Input Format"
      }
      setError(status)
      return false;
    }

    setIsLoading(true)
    fetch('https://api.calorieninjas.com/v1/nutrition?query=' + entry.query,
      {
        method: 'GET',
        url: 'https://api.calorieninjas.com/v1/nutrition?query=' + entry.query,
        headers: { 'X-Api-Key': 'EXZJmSfKrzCjfD5csKLGQQ==3snCEmEYJFlGVzjc' },
        contentType: 'application/json',
      })
      .then(response => response.json())
      .then(jsonData => {
        jsonData.items.forEach(item => {
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

        setIsLoading(false)
      })

    return true;
  }

  // delete entry
  const deleteHandler = (id) => {
    const newData = data.filter((entry) => entry.id !== id);
    setData(newData);
  };

  // edit entry
  const editHandler = (entry) => {
    const newData = data

    setEdit(false)
    setIsLoading(true)
    fetch('https://api.calorieninjas.com/v1/nutrition?query=' + entry.query,
      {
        method: 'GET',
        url: 'https://api.calorieninjas.com/v1/nutrition?query=' + entry.query,
        headers: { 'X-Api-Key': 'EXZJmSfKrzCjfD5csKLGQQ==3snCEmEYJFlGVzjc' },
        contentType: 'application/json',
      })
      .then(response => response.json())
      .then(jsonData => {
        if (jsonData.items.length === 1) {
          newData.map((item) => {
            if (item.id === entry.id) {
              item.meal = jsonData.items[0].name;
              item.quantity = String(jsonData.items[0].serving_size_g) + "g";
              item.calories = jsonData.items[0].calories;
            }
          })
        }

        setIsLoading(false)
      })

    setData(newData);
    setEditMessage("Congratulations old entry changed")
  }

  // Data store if the user is autheticated
  useEffect(() => {
    if (authUser !== false) {
      localStorage.setItem(authUser.id, JSON.stringify(data));
    }
  }, [data])

  // -------------------------- Filter -----------------------------------

  // set filter Date
  const newStartDateSetHandler = (startDate) => setStartDate(startDate);

  // set filter type
  const newSetTypeSetHandler = (type) => setType(type);


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

  const searchChangeHandler = (entry) => {
    (entry === undefined)
      ? setSearch("")
      : setSearch(entry);
  }

  // ------------ Login - Register - Logout --------------------------------

  // Register
  const onRegisterHandler = (newUser) => {
    setRegister(false)

    //fetch users from local storage
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    }
    else {
      users = JSON.parse(localStorage.getItem("users"))
    }

    // Check if the newUser already exist
    let error = "none"
    users.forEach(item => {
      if (item.name === newUser.name && item.surname === newUser.surname && item.birthday === newUser.birthday) {
        error = "User already Exist"
      }
      else if (item.username === newUser.username) {
        error = "Account already Exist"
      }
    })

    let status
    if (error === "none") {
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users));

      status = {
        status: "Congratulations",
        message: "Registretions Completed Successfuly"
      }
    }
    else if (error === "User already Exist") {
      status = {
        status: "I am sorry ",
        message: "User already Exist so try to Log in "
      }
    }
    else if (error === "Account already Exist") {
      status = {
        status: "I am sorry ",
        message: "Account already Exist, try to Log in"
      }
    }

    setRegisterMessage(status)
  }

  // log in
  const onLoginHandler = (credentials) => {

    //fetch users from local storage
    let user, users, tempData, loginSuccess = false;
    if (localStorage.getItem("users") === null) {
      users = [];
    }
    else {
      users = JSON.parse(localStorage.getItem("users"))
    }

    users.map((item) => {
      if (item.username === credentials.username && item.password === credentials.password) {
        user = item
        setAuthUser(item)
        loginSuccess = true
      }
    })

    if (loginSuccess) {
      if (user === undefined) {
        tempData = [];
      } else {
        if (localStorage.getItem(user.id) === null) {
          tempData = [];
        }
        else {
          tempData = JSON.parse(localStorage.getItem(user.id))
        }
      }

      tempData.map((item) => {
        item.date = new Date(item.date)
      })

      setData(tempData)
      setDailyCalories(true)
      setLogin(false)
    }
    else {
      const status = {
        status: "Login Error",
        message: "Unsuccessful logins, try again"
      }
      
      setError(status)
    }
  }

  const onSetCaloriesHandler = (calories) => {
    setDailyCalories(false)
    setCaloriesLimit(calories)
  }

  // log out
  const onLogouHandler = () => {
    localStorage.setItem(authUser.id, JSON.stringify(data));

    setAuthUser(false)
    setCaloriesLimit()
    setData([])
  }

  // Modals
  const errorChangeHandler = () => setError(true)
  const onDismissHandler = () => setError(false)
  const onLoginChangeHandler = () => setLogin(true)
  const onLoginDismissHandler = () => setLogin(false)
  const onRegisterChangeHandler = () => setRegister(true)
  const onRegisterDismissHandler = () => setRegister(false)
  const onRegisterMessageDismissHandler = () => setRegisterMessage(false)
  const onEditHandler = (id) => setEdit(id)
  const onEditDismissHandler = () => setEdit(false)
  const onEditMessageDismissHandler = () => setEditMessage(false)

  return (
    <div className="App">

      {login && <Login
        onLogin={onLoginHandler}
        onCancel={onLoginDismissHandler} />}

      {dailyCalories && <DailyCalories
        user={authUser}
        caloriesLimit={globalCaloriesLimit}
        onSetCalories={onSetCaloriesHandler} />}

      {register && <Register
        onRegister={onRegisterHandler}
        onCancel={onRegisterDismissHandler} />}

      {registerMessage && <ErrorModal
        title={registerMessage.status}
        message={registerMessage.message}
        onDismiss={onRegisterMessageDismissHandler} />}

      {edit && <EditCaloriesInput
        editID={edit}
        onEdit={editHandler}
        onCancel={onEditDismissHandler} />}

      {editMessage && <ErrorModal
        title={""}
        message={editMessage}
        onDismiss={onEditMessageDismissHandler} />}

      {error && <ErrorModal
        title={error.status}
        message={error.message}
        onDismiss={onDismissHandler} />}

      <Navbar
        isLoggedIn={authUser}
        login={onLoginChangeHandler}
        register={onRegisterChangeHandler}
        logout={onLogouHandler} />

      <CaloriesInput
        addEntry={addEntryHandler}
        error={errorChangeHandler} />

      <CaloriesFilter
        search={search}
        startDate={startDate}
        typeList={typeList}
        onSetSearch={searchChangeHandler}
        onSetType={newSetTypeSetHandler}
        onSetStartDate={newStartDateSetHandler}
        onSetTypeList={newSetTypeListSetHandler} />

      {isLoading && <Loading/>}
      {!isLoading && <Calories
        data={data}
        filterSearch={search}
        filterDate={startDate}
        filterType={type}
        caloriesLimit={caloriesLimit}
        onEdit={onEditHandler}
        onDelete={deleteHandler} />}
    </div >
  )
}

export default App;