"use client"
import { FC, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, db } from '../lib/firebase/firebase-conf';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';


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
    // try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName: 'ほげほげ' })

      // const userDoc = getDoc(collection(db, 'users'))
      // if (!(await userDoc).exists()) {
        // Firestore にユーザー用のドキュメントが作られていなければ作る
        // await userDoc.ref.set({
        //   screen_name: auth.currentUser.uid,
        //   display_name: '名無しさん',
        //   created_at: db.FieldValue.serverTimestamp(),
        // });
        setDoc(doc(db, "users", auth.currentUser.uid), {
          screen_name: auth.currentUser.uid,
          display_name: '名無しさん',
          created_at: serverTimestamp(),
        })
      // }

      await sendEmailVerification(auth.currentUser)
      // router.push('/sent')
    // } catch (err) {
    //   alert(err.message)
    // }
  }


  return (
    <>
      <Header />
      <div className='container content'>
        <form className='mt-3' onSubmit={createUser}>
          <div className='mb-3'>
            <label className='form-label' htmlFor="email">
              メールアドレス{' '}
            </label>
            <input
              className='form-control'
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor="password">
              パスワード{' '}
            </label>
            <input
              className='form-control'
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='btn btn-primary mb-3' type="submit">
            サインアップ
          </button>
        </form>
        <Link href={"/signin"}>サインイン</Link>
      </div>

      <footer className="p-2 border-top border-2">
      </footer>

    </>
  )
}

export default SignUp
