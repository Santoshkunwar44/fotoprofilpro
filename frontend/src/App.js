import "./App.css";
import Navbar from "./layouts/Sidebar/navbar/Navbar";
import Create from "./pages/Create/Create";
import Home from "./pages/Home/Home";
import {Route,Routes} from "react-router-dom"
import Workspace from "./pages/workSpace/Workspace";
import { History } from "./pages/history/History";
import { useEffect } from "react";
import { loggedInUserApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./redux/store";
import useAlert from "./hooks/useAlert";
import useSocket from "./hooks/useSocket";
function App() {

  const dispatch = useDispatch()
  const {addUserAction} = bindActionCreators(actionCreators,dispatch )
  const socket = useSocket();

  useEffect(()=>{
    fetchLoggedInUser()
  },[])

  const fetchLoggedInUser=async()=>{
    try {
         const res = await loggedInUserApi();
         if(res.status===200){
          addUserAction(res.data.message)
         }

    } catch (error) {
        console.log(error)
    }
  }
  return (
    <>
      <div className="App">
       <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/workspace" element={<Workspace/>}
         />
         <Route  path="/assets" element={<History/>}/>
       </Routes>
      </div>
    </>
  );
}

export default App;
