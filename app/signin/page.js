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

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log(user);
            user && router.replace('/')
        })
    }, [])

    const logIn = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log(auth.currentUser);
            router.replace('/')

        } catch (err) {
            alert(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />
            <div className='container content'>
                <form className='mt-3' onSubmit={logIn}>
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
                    <button className='btn btn-primary mb-3' type="submit" disabled={isLoading}>
                        {
                            isLoading ? (<>
                                <div className="spinner-border spinner-border-sm text-light me-2" role="status">
                                    {/* <span className="visually-hidden">Loading...</span> */}
                                </div>
                                <span>認証中</span>
                                </>
                            ) : (
                                <>サインイン</>
                            )
                        }
                    </button>
                </form>
                <Link href="/signup">
                    サインアップ
                </Link>
            </div>

            <footer className="p-2 border-top border-2">
            </footer>

        </>
    )
}

export default Login
