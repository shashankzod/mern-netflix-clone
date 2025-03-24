import React from 'react'
import Homescreen from './Homescreen'
import AuthScreen from './AuthScreen'
import { useAuthStore } from '../../store/authUser'

const HomePage = () => {
 const { user} = useAuthStore()
  return (
    <div >
      {user ? <Homescreen/> : <AuthScreen/> }
    </div>
  )
}

export default HomePage
