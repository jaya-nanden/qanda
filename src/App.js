import { AuthProvider,useAuth } from './contexts/AuthContext';
import { DatabaseProvider } from './contexts/DatabaseContext';

import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom"
// import { DatabaseProvider } from './contexts/DatabaseContext';

import './App.css';

import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import AdminPage from './components/Admin/AdminPage';
import IndividualQuestion from './components/Dashboard/IndividualQuestion';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <DatabaseProvider>
            <Switch>
              <ProtectedRoute exact path='/login' component={LoginPage} />
              <ProtectedRoute exact path='/' component={HomePage} />
              <ProtectedRoute exact path='/admin' component={AdminPage} />
              <ProtectedRoute exact path='/question=:questionID' component={IndividualQuestion} />
              {/* <ProtectedRoute exact path='/test' component={TestFeature} /> */}
              {/* <Route path="/*" component={WrongURL} />  */}
            </Switch>
          </DatabaseProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

function ProtectedRoute(props) {
  
  const  { currentUser } = useAuth()
  const { path } = props
  // console.log('path', path)
  const location = useLocation()
  // console.log('location state', location.state)

  if (path === '/login' || 
      path === '/signup' ||
    path === '/forgot-password') {
      // console.log(currentUser);
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...props} />
    )
  }

  if(path === '/admin') {
    // console.log(process.env.REACT_APP_ADMIN_MAIL_ID);
    if(currentUser.email === process.env.REACT_APP_ADMIN_MAIL_ID) {
      return <Route {...props} />
    } else {
      return <Redirect
      to={{
        pathname: '/'
      }} />
    }
  }

  return currentUser 
  ? (
  <Route {...props} />
  ) 
  : (
  <Redirect
    to={{
      pathname: '/login',
      state: { from: path}
    }}
/> )
}


export default App;
