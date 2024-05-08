import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import avatar from '../assets/avatar.jpg'
import '../style/nav.scss'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'


const Nav = () => {


  const user = useSelector(selectUser)



  const [show, handleShow] = useState(false)
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    }
    else
      handleShow(false)
  }

  const navigate = useNavigate();
  const trigger = () => {

    navigate('/profile');
  }


  useEffect(() => {

    window.addEventListener("scroll", transitionNavBar)
    return () => window.removeEventListener("scroll", transitionNavBar)


  }, [])


  return (
    <div className={`nav ${show && "nav_black"} `} >
      <div className="nav_content">
        <img src={logo} onClick={() => {
          navigate("/home");
        }} className="nav-logo" alt="" />

        {user.emailVerified ?

          (
            <>
              <h2 className='userName' >{user.name}</h2>
              <img src={user.photo} onClick={trigger} referrerpolicy="no-referrer" className="nav-avatar" alt="" />
            </>
          )
: (
  <img src={avatar} onClick={trigger}  className="nav-avatar" alt="" />
)
      
      }

      </div>


    </div>
  )
}

export default Nav