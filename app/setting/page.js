"use client"
import Header from "@/components/header";
import Footer from "@/components/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/firebase-conf";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Setting() {
    const router = useRouter()
    // const [currentUser, setCurrentUser] = useState(null)

    // useEffect(() => {
    //     auth.onAuthStateChanged((user) => {
    //         user ? setCurrentUser(user) : router.replace('/signin')
    //         !user.emailVerified && router.push('/sent')
    //     })
    // }, [])

    const logOut = async () => {
        try {
            await signOut(auth)
            router.replace('/signin')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <main>
            <Header />
            <div className="container">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Web Services by Yahoo! JAPAN （https://developer.yahoo.co.jp/sitemap/）</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
                <div>
                    {/* <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre> */}
                    <button onClick={logOut}>Logout</button>
                </div>
            </div>
            <Footer />
        </main>
    );
};
