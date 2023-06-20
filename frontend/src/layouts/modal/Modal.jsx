import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
        ModalBody,
    useDisclosure,
    ModalFooter,
  } from '@chakra-ui/react'
import styles from "./modal.module.css"
import { useState } from 'react'
  function SignUpModal({children}) {
    const [activeTab,setActiveTab] =useState("login")
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal  isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxWidth={"480px"} width={"95%"}  className={styles.modal_container}>
        {
          
          
  activeTab==="login"?          <LoginTab handlChangeTab={setActiveTab}/>:<SignUpTab handlChangeTab={setActiveTab}/>

        }
  
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default SignUpModal


  function LoginTab({handlChangeTab}) {
    return (
 <>
      
            <ModalHeader className={styles.modal_header}>
           <img src="/images/logo.png" alt="logoImg" />   <h1>LOGIN  TO PHOTOPROFIL</h1>

            </ModalHeader>
            <ModalBody  className={styles.modal_body}>
              <form className={styles.modal_form} action="">


              <input className={styles.modal_input}  placeholder='username or email' type="text" />
              <input  className={styles.modal_input} placeholder='password' type="password" name="" id="" />
              <button className={styles.login_btn}> 
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

  function SignUpTab({handlChangeTab}) {
    return (
 <>
      
            <ModalHeader className={styles.modal_header}>
           <img src="/images/logo.png" alt="logoImg" />   <h1>SIGN UP  TO PHOTOPROFIL</h1>

            </ModalHeader>
            <ModalBody  className={styles.modal_body}>
            <form className={styles.modal_form} action="">

              <input className={styles.modal_input}  placeholder='username or email' type="text"  required/>
              <input className={styles.modal_input}  placeholder='username or email' type="email" required />
              <input  className={styles.modal_input} placeholder='password' type="password" name="" id=""  required/>
              <button className={styles.login_btn}> 
                LOGIN
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