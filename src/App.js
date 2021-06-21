import { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import NotFound from './components/Home/NotFound/NotFound';
import Home from './components/Home/Home/Home';
import Header from './components/Home/Header/Header';
import Login from './components/Login/Login';
import Employer from './components/Employer/Employer';
import AddJobs from './components/Employer/AddJobs/AddJobs';
import EmployerLogin from './components/Employer/EmployerLogin/EmployerLogin';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/header">
            <Header></Header>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/employerlogin">
            <EmployerLogin></EmployerLogin>
          </Route>
          <Route path="/employer">
            <Employer></Employer>
          </Route>
          <Route path="/addjobs">
             <AddJobs></AddJobs>
          </Route>          
           <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
