import { AuthContext } from "@/app/lib/firebase/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const AuthGuard = ({ children }) => {
    const router = useRouter()

    if (useContext(AuthContext).currentUser === undefined) {
        router.replace('/signin')
        return null
    } else if (useContext(AuthContext).currentUser === null) {
        return null
    } else {
        return <>{children}</>
    }
}

export default AuthGuard
