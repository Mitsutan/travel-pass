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

    const [error, setError] = useState(null)

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
            // alert(err)
            console.log(err.code);

            switch (err.code) {
                case 'auth/invalid-email':
                    setError('メールアドレスが不正です。')
                    break;

                case 'auth/missing-password':
                    setError('パスワードが入力されていません。')
                    break;

                case 'auth/invalid-login-credentials':
                    setError('メールアドレスまたはパスワードが間違っています。')
                    break;

                case 'auth/network-request-failed':
                    setError('ネットワークエラーが発生しました。')
                    break;

                default:
                    setError('不明なエラーが発生しました。')
                    break;
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />
            <div className='container content'>
                <h1>アプリ名</h1>
                {
                    error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )
                }
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
                            required
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
                            required
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
