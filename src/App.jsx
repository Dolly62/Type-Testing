
import "./App.css";
import UserInput from "./Components/UserInput";
import WebTitle from "./Components/WebTitle";
import { Redirect, Route, Switch } from "react-router-dom";
import Result from "./Components/Result";

function App() {
  return (
    <div className="bg-purple-200">
      <WebTitle />
      <Switch>
        <Route exact path="/">
          <Redirect to="/type-test"/>
        </Route>
        <Route path="/type-test">
          <UserInput />
        </Route>
        <Route path="/user-result">
          <Result />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
