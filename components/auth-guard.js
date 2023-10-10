"use client"
import { AuthContext } from "@/app/lib/firebase/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const AuthGuard = ({ children }) => {
    const router = useRouter()
    const user = useContext(AuthContext).currentUser

    if (user === undefined) {
        router.replace('/signin')
        return (<>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>)
    } else if (user === null) {
        return (<>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>)
    } else {
        return <>{children}</>
    }
}

export default AuthGuard
