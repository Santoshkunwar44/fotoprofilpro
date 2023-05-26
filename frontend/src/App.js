import "./App.css";
import Navbar from "./layouts/Sidebar/navbar/Navbar";
import Create from "./pages/Create/Create";
import Home from "./pages/Home/Home";
import {Route,Routes} from "react-router-dom"
function App() {
  return (
    <>
      <div className="App">
       <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
       </Routes>
      </div>
    </>
  );
}

export default App;
