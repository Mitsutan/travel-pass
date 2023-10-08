"use client"
import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from '../lib/firebase/firebase-conf'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Header from '@/components/header'
import Footer from '@/components/footer'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log(user);
            user && router.replace('/')
        })
    }, [])

    const logIn = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log(auth.currentUser);
            router.replace('/')

        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <>
            <Header />
            <div>
                <form onSubmit={logIn}>
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
                        Login
                    </button>
                </form>
                <Link href="/signup">
                    signup
                </Link>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Login
