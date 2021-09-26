import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

const Routes = () => {
  const [userId, setUserId] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@KenzieHub:token");
    token && setAuthenticated(true);
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Login
          userId={userId}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>

      <Route path="/register">
        <Register userId={userId} authenticated={authenticated} />
      </Route>

      <Route path="/home/:id">
        <Home
          setUserId={setUserId}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
