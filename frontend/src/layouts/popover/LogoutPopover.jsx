import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'
import { logoutApi } from '../../utils/api'
import {bindActionCreators} from 'redux'
import {useDispatch} from "react-redux"
import { actionCreators } from '../../redux/store'

const styles={
    logoutBtn:{
        height:"35px",
        cursor:"pointer",
        width:"100%",
        border:"none",
        outline:"none",
        background:"var(--btn_bg)",
        borderRadius:"4px",
    }
}

const LogoutPopover = ({children}) => {
const dispatch = useDispatch()
const {removeUserAction} = bindActionCreators(actionCreators,dispatch)
    const handleLogout=async()=>{
        try {
                const res = await logoutApi();
                if(res.status===200){
                     removeUserAction()
                }
        } catch (error) {
            console.log(error)
        }
    }

  return (
<Popover autoFocus closeOnBlur >
  <PopoverTrigger>
    <span>{children}</span>

  </PopoverTrigger>
  <PopoverContent width={"140px"}>
    <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
  </PopoverContent>
</Popover>
  )
}

export default LogoutPopover