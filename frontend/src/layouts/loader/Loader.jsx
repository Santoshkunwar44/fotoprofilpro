import {createPortal} from "react-dom"




const Loader = () => {
  return (
   <>
   
    {
      createPortal(<> <div className="loader_bg">
        <div className="loader_content">
          <img width="96" height="96" src="https://img.icons8.com/fluency/96/loading.png" alt="loading"/>
        </div>
        </div> </>,document.body)
    }
   
   </>
  )
}

export default Loader