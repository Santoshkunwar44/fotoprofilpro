import "./App.css";
import Navbar from "./layouts/Sidebar/navbar/Navbar";
import Create from "./pages/Create/Create";
import Home from "./pages/Home/Home";
import {Route,Routes} from "react-router-dom"
import Workspace from "./pages/workSpace/Workspace";
import { History } from "./pages/history/History";
import useSetup from "./hooks/useSetup";
import useSocket from "./hooks/useSocket";
import Progress from "./pages/Progress/Progress";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const  {unseenImagesCount,activeMessageId} =useSelector(state=>state.image);
 const setup = useSetup();
 const socket =useSocket(activeMessageId,unseenImagesCount) 

  return (
    <>
      <div className="App">
       <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/workspace" element={<Workspace/>}/>
         <Route path="/assets/:messageId" element={<Progress/>}/>
         <Route  path="/assets" element={<History/>}/>
       </Routes>
      </div>
    </>
  );
}

export default App;
