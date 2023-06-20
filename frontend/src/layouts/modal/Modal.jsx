import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
        ModalBody,
    useDisclosure,
    ModalFooter,
  } from '@chakra-ui/react'
  import {bindActionCreators} from "redux"
import styles from "./modal.module.css"
import { useEffect, useState } from 'react'
import { loginApi, registerApi } from '../../utils/api'
import {useDispatch} from "react-redux"
import { actionCreators } from '../../redux/store'

  function SignUpModal({children}) {
    const [activeTab,setActiveTab] =useState("login")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch =useDispatch()
    const {addUserAction} = bindActionCreators(actionCreators,dispatch)

    const [authData,setAuthData] = useState({
    username:"",
    email:"",
    password:""
  })

  console.log(authData)


  useEffect(()=>{
    setAuthData({
      email:"",
      password:"",
      username:""
    })
  },[activeTab])


  const handleInputChange=(e)=>{
    const {name,value} = e.target ;
    setAuthData(prev=>({
      ...prev, [name]:value
    }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
      if(activeTab==="login"){

        const res = await loginApi(authData)
        if(res.status===200){
          addUserAction(res.data.message)
        }else{
          throw res.data.message
        }        
      }else {
      const res =   await  registerApi(authData)
             if(res.status===200){
          addUserAction(res.data.message)
        }else{
          throw res.data.message
        }   
      }
    } catch (error) {
      console.log(error.message)
    }

  }

    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal  isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxWidth={"480px"} width={"95%"}  className={styles.modal_container}>
        {
          
          
  activeTab==="login"?       
   <LoginTab  handleInputChange={handleInputChange} handleSubmit={handleSubmit} handlChangeTab={setActiveTab}  authData={authData} />:
  
  <SignUpTab handleInputChange={handleInputChange}  handleSubmit={handleSubmit} handlChangeTab={setActiveTab}  authData={authData}  />

        }
  
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default SignUpModal



  function LoginTab({handlChangeTab,handleSubmit,handleInputChange ,authData}) {


    return (
 <>
            <ModalHeader className={styles.modal_header}>
           <img src="/images/logo.png" alt="logoImg" />   <h1>LOGIN  TO PHOTOPROFIL</h1>

            </ModalHeader>
            <ModalBody  className={styles.modal_body}>
              <form className={styles.modal_form} onSubmit={handleSubmit}>


              <input  name='email' className={styles.modal_input}  placeholder='email' type="text"  onChange={handleInputChange} value={authData.email} required/>
              <input  className={styles.modal_input} placeholder='password' type="password" name="password" id=""  onChange={handleInputChange} value={authData.password} required/>
              <button type="submit" className={styles.login_btn}> 
                LOGIN
              </button>

              </form>
              
            </ModalBody>
            <ModalFooter className={styles.modal_footer}>
              <p>Forgot Password?</p>
              <p onClick={()=>handlChangeTab("signup")}>Dont have account ?</p>
            </ModalFooter>
      </>



    )

    
  }

  function SignUpTab({handlChangeTab,handleSubmit ,handleInputChange ,authData}) {
    return (
 <>
      
            <ModalHeader className={styles.modal_header}>
           <img src="/images/logo.png" alt="logoImg" />   <h1>SIGN UP  TO PHOTOPROFIL</h1>

            </ModalHeader>
            <ModalBody  className={styles.modal_body}>

            <form className={styles.modal_form} onSubmit={handleSubmit}>

              <input className={styles.modal_input}  placeholder='username' type="text"   name='username' required  onChange={handleInputChange}  value={authData.username}/>

              <input className={styles.modal_input}  placeholder='email' type="email" name='email' required  onChange={handleInputChange}  value={authData.email}/>

              <input  className={styles.modal_input} placeholder='password' type="password" name="password" id=""  required  onChange={handleInputChange} value={authData.password}/>

              <button type='submit' className={styles.login_btn}> 
              REGISTER

              </button>

            </form>
              
            </ModalBody>

            <ModalFooter className={styles.modal_footer}>

              <p>Forgot Password?</p>

              <p onClick={()=>handlChangeTab("login")}>Already have account ?</p>

            </ModalFooter>
      </>



    )

    
  }