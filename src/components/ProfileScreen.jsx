import React from 'react'
import  '../style/profileScreen.scss'
import avatar from '../assets/avatar.jpg'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import PlanScreen from './PlanScreen'

const ProfileScreen = () => {

    const user = useSelector(selectUser)
    const navigate=  useNavigate ();
    const SignOut=()=>{
        auth.signOut();
        navigate("/");
    }

  return (
    <div className='ProfileScreen' >
        <Nav/>

        <div className="profileScreen_body">
            <h1>Edit Profile</h1>
            <div className="profileScreen_info">

                {user.emailVerified ?  
                (<img src={user.photo} referrerpolicy="no-referrer" alt="" />) :(<img src={avatar} referrerpolicy="no-referrer" alt="" />)
                }
                
                <div className="profileScreen_details">
                {user.emailVerified ?  
                (    <h2>{user.name}</h2>) :(    <h2>{user.email}</h2>)
                }
                
                
                    <div className="profileScreen_plans">

                        <h3>Plans</h3>
                        <PlanScreen/>
                        <button onClick={SignOut} className='profileScreen_signout'>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ProfileScreen