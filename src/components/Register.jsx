import React, { useEffect, useState } from 'react'
import {auth, googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from 'firebase/auth'
const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  //  const [currentuser, setCurrentUser] = useState(null)
    const handleSubmit = async () => {
      await createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = async() =>{
      try {
        await signInWithPopup(auth, googleProvider)

      } catch (error) {
        console.log(error)
      }
    }

    const logOut = async() => {
      try {
        await signOut(auth)
      } catch (error) {
        console.log(error)
      }
    }

   
  return (
    <div className='flex flex-col gap-4 items-center'>
        <input type="text"  placeholder='email ..' onChange={(e) => setEmail(e.target.value)} className='Button'/>
        <input type="password"  placeholder='Password..'  onChange={(e) => setPassword(e.target.value)} className='Button'/>
        <button onClick={handleSubmit} className='Button bg-emerald-500'>sign in</button>
        <button onClick={signInWithGoogle} className='Button bg-sky-600'>Sign in with google</button>
        <button onClick={logOut} className='Button bg-violet-700'>sign out</button>
        <img src={auth?.currentUser?.photoURL} alt="" width={200} className='rounded-full'/>
        <h1>Current email: {auth?.currentUser?.email}</h1>
    </div>
  )
}

export default Register