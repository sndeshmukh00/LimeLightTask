// import logo from "./logo.svg";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./Screens/Details";
import Home from "./Screens/Home";

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} name="Home" />
      <Route path="/details" name="Details" element={<Details />} />
    </Routes>
  </Router>
);

export default App;
