import React, { useEffect, useState } from 'react'
import styles from "./Pricing.module.css"
import { Snap } from 'midtrans-client';
import querystring   from "querystring"
import { get_redirect_url_Api } from '../../utils/api';
import {useSelector} from "react-redux"
const Pricing = () => {

    const {data:user}= useSelector(state=>state.user)
    const [redirectUrl,setRedirectUrl] = useState("")
    const handleCreateToken=async({price,name,id})=>{
            const body_payload={
                user:{
                    first_name:user.username.split(" ")[0] ,
                    last_name:user.username.split(" ")[1] ?? "", 
                    email:user.email
                },
                item:[
                    {
                        id,
                        price,
                        quantity:1,
                        name,
                        merchant_name:"fotoprofilpro",
                    }
                ]
            }
            console.log(body_payload)
            try {
                    const {data ,status}= await get_redirect_url_Api(body_payload);
                    console.log(data);
                    if(status===200){
                      const {redirectUrl} = data.message
                        setRedirectUrl(redirectUrl);
                    }else{
                        throw data.message 
                    }
            } catch (error) {
                
                    console.log(error)
            }   

    }


    useEffect(()=>{
        if(!redirectUrl)return; 
        window.open(redirectUrl);
    },[redirectUrl])

  return (
    <div className={styles.pricing}>

       
        <div className={styles.pricing_box }>
            <div className={styles.pricing_box_header}>

            <h1 className={styles.plan_name}>Premium</h1>
            <h1> 50 IDR  / 50 photos</h1>
            </div>
            <ul>

            <li>Get email when image generated</li>
            <li>Generate 45 images</li>
            </ul>
             <button className={styles.buy_plan_button} onClick={()=>handleCreateToken({price:45,name:"Premium IDR45/45photos",id:"premium"})}>  BUY NOW</button>
            
        </div>

            <div className={styles.pricing_box }>
        <div className={styles.pricing_box_header}>
            <h1 className={styles.plan_name}>Advance    </h1>
            <h1>90 IDR/ 100 photos</h1>
        </div>
            <ul>

            <li>Get email when image generated</li>
            <li>Generate 90 images</li>
            </ul>
                <button className={styles.buy_plan_button}  onClick={()=>handleCreateToken({price:45,name:"Premium IDR90/100photos",id:"advance"})}> BUY NOW</button>
            
        </div>
    </div>
  )
}

export default Pricing