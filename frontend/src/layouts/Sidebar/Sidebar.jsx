import "./Sidebar.css"
import {FaUpload} from "react-icons/fa"
import {RiSave3Fill,RiAccountPinBoxFill} from "react-icons/ri"
import {SiHatenabookmark} from "react-icons/si"
import {AiFillSetting} from "react-icons/ai"
import {GiSailboat}  from "react-icons/gi"

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="app_intro">
            <h2 className="sidebar_app_name">IMGENS</h2>
             
        </div>
        <div className="sidebar_list">

            <div className="sidebar_list_item">
            <FaUpload className="sidebar_icon"/>
                <p>Create varitation</p> 

            </div>

            <div className="sidebar_list_item">
    <RiSave3Fill className="sidebar_icon"/>
           <p>
           saved Images 
            </p>     

            </div>
            <div className="sidebar_list_item">
                <SiHatenabookmark className="sidebar_icon"/>
                <p>Bookmarks</p> 
            </div>
            <div className="sidebar_list_item">
                <RiAccountPinBoxFill className="sidebar_icon"/>
    <p>Account</p>
            </div>
            <div className="sidebar_list_item">
                <AiFillSetting className="sidebar_icon"/>
            <p>Setting</p>
            </div>

        </div>
        <div className="sidebar_bottom">
            <p>Made with </p>
            <p className="mid_journey_text">MidJourney</p>
            <GiSailboat className="sail_boat_icon"/>
            </div>
    </div>
  )
}

export default Sidebar