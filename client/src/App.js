import React from 'react'
import Login from "./components/auth/login"
import Signup from "./components/auth/signup"
import Home from "./components/home/index"


import ProtectedRoute from "./components/auth/authCheck"

import {
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <ProtectedRoute path="/posts" component={Home} />

      <Route
        render={() =>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',minHeight:'100vh'}}>
              <span style={{fontWeight:'bold',fontSize:'43px',color:'white'}}>404!</span>
              <span style={{fontSize:'23px',color:'white'}}>page not found</span>
          </div>
        }
      />
    </Switch>
  );
}

export default App;
