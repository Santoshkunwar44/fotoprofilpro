import React from 'react'
import {bindActionCreators} from "redux"
import {useDispatch, useSelector}  from "react-redux"
import { actionCreators } from '../../redux/store'
import { MjUpscaleApi } from '../../utils/api'
import styles from "./buttons.module.css"


const Buttons = () => {


    const {activeImage} =useSelector(state=>state.image)

    const dispatch =useDispatch()
    const {addActiveImageAction} = bindActionCreators(actionCreators,dispatch);

    console.log(activeImage)


    const handleClickButton=async(button)=>{

        const {buttonId,btnMessageIds} =activeImage;

            try {
                  const {data} =   await MjUpscaleApi({
                        buttonMessageId:buttonId,
                        button
                    })
                    addActiveImageAction({
                        ...activeImage,
                        btnMessageIds:[
                            ...btnMessageIds,
                            data.messageId
                        ]
                    })
            } catch (error) {
                console.log(error)
            }
    }

  return (
    <div className={styles.msg_btn_box}>


        {
            activeImage && activeImage.buttons.slice(0,4).map((btn,index)=>(
                    <button onClick={()=>handleClickButton(btn)}>IMAGE {index + 1}</button>
            ))
        }

    </div>
  )
}

export default Buttons