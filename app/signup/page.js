"use client"
import { FC, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'

import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../lib/firebase/firebase-conf';
import Header from '@/components/header';
import Footer from '@/components/footer';


const SignUp = () => {
  // console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  // const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // user && router.push('/')
    })
  }, [])

  const createUser = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(auth.currentUser)
      // router.push('/sent')
    } catch (err) {
      alert(err.message)
    }
  }


  return (
    <>
      <Header />
      <div>
        <form onSubmit={createUser}>
          <div>
            <label htmlFor="email">
              Email:{' '}
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">
              Password:{' '}
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">
            SignUp
          </button>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default SignUp
