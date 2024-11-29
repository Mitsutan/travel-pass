"use client"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useContext, useState } from "react";
import { AuthContext, AuthProvider } from "@/app/lib/firebase/auth/auth-provider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/firebase-conf";
import { updateEmail, updateProfile } from "firebase/auth";

export default function Profile() {

    let { cu } = ""
    cu = useContext(AuthContext).currentUser
    console.log(cu.displayName);
    // console.log(useContext(AuthContext));
    const [email, setEmail] = useState(cu.email)
    const [password, setPassword] = useState('')
    const [name, setName] = useState(cu.displayName)
    const [prefecture, setPrefecture] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    getDoc(doc(db, "users", cu.uid)).then((doc) => {
        setPrefecture(doc.data().prefecture)
        console.log(doc.data());
        // console.log(prefecture);
    })

    const updateUser = async (e) => {

        e.preventDefault()
        setIsLoading(true)

        try {

            await updateProfile(cu, { displayName: name })
            // await updateEmail(cu, email)
            
            await updateDoc(doc(db, "users", cu.uid), {
                display_name: name,
                prefecture: prefecture,
            })

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <Header />
            <div className="content">
                <h1>プロフィール</h1>
                {/* <pre>{cu.displayName}</pre> */}
                <form onSubmit={updateUser}>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="email">
                            メールアドレス{' '}
                        </label>
                        <input
                            className='form-control'
                            id="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    {/* <div className='mb-3'>
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
                    </div> */}
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="name">
                            ユーザー名{' '}
                        </label>
                        <input
                            className='form-control'
                            id="name"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="prefecture">
                            居住地{' '}
                        </label>
                        <select className='form-select' id="prefecture" defaultValue={0} value={prefecture} onChange={(e) => setPrefecture(e.target.value)} required>
                            <option value="0" hidden>選択してください</option>
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
                                </div>
                                <span>処理中</span>
                            </>
                            ) : (
                                <>更新</>
                            )
                        }
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

// export default Test;
