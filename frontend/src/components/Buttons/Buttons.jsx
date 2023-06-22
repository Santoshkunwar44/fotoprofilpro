import React from 'react'
import {bindActionCreators} from "redux"
import {useDispatch, useSelector}  from "react-redux"
import { actionCreators } from '../../redux/store'
import { MjUpscaleApi, addButtonMessageIdApi } from '../../utils/api'
import styles from "./buttons.module.css"


const Buttons = () => {


    const {activeImage} =useSelector(state=>state.image)

    const dispatch =useDispatch()
    const {addActiveImageAction} = bindActionCreators(actionCreators,dispatch);


    console.log(activeImage)

    


    const handleClickButton=async(button)=>{

        const {buttonId,btnMessageIds ,messageId} =activeImage;


            try {
                  const {data} =   await MjUpscaleApi({
                        buttonMessageId:buttonId,
                        button
                    });

                    const newData={
                        btnId:data.messageId,
                        button
                    }

                    await addButtonMessageIdApi(messageId,newData)
                    console.log("response messaged  id",data.messageId)
                    addActiveImageAction({
                        ...activeImage,
                        btnMessageIds:[
                            ...btnMessageIds,
                            newData]

                    })
            } catch (error) {
                console.log(error)
            }
    }

  return (
    <div className={styles.msg_btn_box}>


        {
            activeImage && activeImage.buttons.slice(0,4).map((btn,index)=>(
                    <button  className={activeImage.btnMessageIds.find(img=>img.button===btn) ? styles.disable :""} onClick={()=>handleClickButton(btn)  }> 
                {
                    activeImage.btnMessageIds.find(img=>img.button===btn) ?     <img width="48" height="48" src="https://img.icons8.com/color/48/ok--v1.png" alt="ok--v1"/>   :  <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/40C057/loading.png" alt="loading"/>
                }
                    IMAGE {index + 1} 
                    
                    </button>
            ))
        }

    </div>
  )
}

export default Buttons