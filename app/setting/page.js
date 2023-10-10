"use client"
import Header from "@/components/header";
import Footer from "@/components/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/firebase-conf";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../lib/firebase/auth/auth-provider";
import AuthGuard from "@/components/auth-guard";

export default function Setting() {
    const router = useRouter()
    // const [currentUser, setCurrentUser] = useState(null)
    console.log(useContext(AuthContext));

    // useEffect(() => {
    //     auth.onAuthStateChanged((user) => {
    //         user ? setCurrentUser(user) : null
    //     })
    // }, [])

    const logOut = async () => {
        try {
            await signOut(auth)
            // router.replace('/signin')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <main>
            <Header />
            <AuthGuard>
                <div className="container content">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Web Services by Yahoo! JAPAN （https://developer.yahoo.co.jp/sitemap/）</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                    </ul>
                    <div>
                        {/* <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre> */}
                        {/* <pre>{JSON.stringify(useContext(AuthContext).currentUser)}</pre> */}
                        <button onClick={logOut}>Logout</button>
                    </div>
                </div>
                <Footer />
            </AuthGuard>
        </main>
    );
};
