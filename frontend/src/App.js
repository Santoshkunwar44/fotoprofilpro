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
import Pricing from "./pages/pricing/Pricing";
import Loader from "./layouts/loader/Loader";
import Describe from "./pages/describe/Describe";
import Payment from "./pages/payment/Payment";
import PaymentFailed from "./components/payment/PaymentFailed";
import PaymentSuccess from "./components/payment/PaymentSuccess";
import PaymentPending from "./components/payment/PaymentPending";

function App() {
  const  {unseenImagesCount,activeMessageId,loading} =useSelector(state=>state.image);
  useSetup();
  useSocket(activeMessageId,unseenImagesCount) 

  return (
    <>
      <div className="App">

          {
            loading && <Loader/>
          }
       <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/describe" element={<Describe/>}  />
        {/* <Route  path="descrbie/:id" element={< }/> */}
        <Route path="/services" element={<Workspace/>}/>
         <Route path="/assets/:messageId" element={<Progress/>}/>
         <Route  path="/assets" element={<History/>}/>
         <Route  path="/pricing" element={<Pricing/>}/>
         <Route path="/payment" element={<Payment/>}>
          <Route path="failed" element={<PaymentFailed/>}/>
          <Route path="success" element={<PaymentSuccess/>}/>
          <Route  path="pending" element={<PaymentPending/>}/>
          
          </Route>
       </Routes>
      </div>
    </>
  );
}

export default App;
