"use client"
import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, db } from '../lib/firebase/firebase-conf';
import Header from '@/components/header';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';


const SignUp = () => {
  // console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  // const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [prefecture, setPrefecture] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     // user && router.push('/')
  //   })
  // }, [])

  const createUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName: name })

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        screen_name: auth.currentUser.uid,
        display_name: name,
        prefecture: prefecture,
        created_at: serverTimestamp(),
      })
      // }

      await sendEmailVerification(auth.currentUser)
      // router.push('/sent')
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
          <div className='mb-3'>
            <label className='form-label' htmlFor="name">
              ユーザー名{' '}
            </label>
            <input
              className='form-control'
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor="prefecture">
              居住地{' '}
            </label>
            <select className='form-select' id="prefecture" defaultValue={0} onChange={(e) => setPrefecture(e.target.value)}>
              <option value="0" disabled>選択してください</option>
              <optgroup label="北海道・東北地方">
                <option value="1">北海道</option>
                <option value="2">青森県</option>
                <option value="3">岩手県</option>
                <option value="4">宮城県</option>
                <option value="5">秋田県</option>
                <option value="6">山形県</option>
                <option value="7">福島県</option>
              </optgroup>
              <optgroup label="関東地方">
                <option value="8">茨城県</option>
                <option value="9">栃木県</option>
                <option value="10">群馬県</option>
                <option value="11">埼玉県</option>
                <option value="12">千葉県</option>
                <option value="13">東京都</option>
                <option value="14">神奈川県</option>
              </optgroup>
              <optgroup label="中部地方">
                <option value="15">新潟県</option>
                <option value="16">富山県</option>
                <option value="17">石川県</option>
                <option value="18">福井県</option>
                <option value="19">山梨県</option>
                <option value="20">長野県</option>
                <option value="21">岐阜県</option>
                <option value="22">静岡県</option>
                <option value="23">愛知県</option>
              </optgroup>
              <optgroup label="近畿地方">
                <option value="24">三重県</option>
                <option value="25">滋賀県</option>
                <option value="26">京都府</option>
                <option value="27">大阪府</option>
                <option value="28">兵庫県</option>
                <option value="29">奈良県</option>
                <option value="30">和歌山県</option>
              </optgroup>
              <optgroup label="中国地方">
                <option value="31">鳥取県</option>
                <option value="32">島根県</option>
                <option value="33">岡山県</option>
                <option value="34">広島県</option>
                <option value="35">山口県</option>
              </optgroup>
              <optgroup label="四国地方">
                <option value="36">徳島県</option>
                <option value="37">香川県</option>
                <option value="38">愛媛県</option>
                <option value="39">高知県</option>
              </optgroup>
              <optgroup label="九州地方">
                <option value="40">福岡県</option>
                <option value="41">佐賀県</option>
                <option value="42">長崎県</option>
                <option value="43">熊本県</option>
                <option value="44">大分県</option>
                <option value="45">宮崎県</option>
                <option value="46">鹿児島県</option>
                <option value="47">沖縄県</option>
              </optgroup>
            </select>
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
                <>サインアップ</>
            )
            }
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
