import "./App.css";
import Navbar from "./layouts/Sidebar/navbar/Navbar";
import Create from "./pages/Create/Create";
import Home from "./pages/Home/Home";
import {Route,Routes} from "react-router-dom"
import Workspace from "./pages/workSpace/Workspace";
import { History } from "./pages/history/History";
function App() {
  return (
    <>
      <div className="App">
       <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/workspace" element={<Workspace/>}
         />
         <Route  path="/history" element={<History/>}/>
       </Routes>
      </div>
    </>
  );
}

export default App;
