import { AuthContext } from "@/app/lib/firebase/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import Loading from "./loading"

const AuthGuard = ({ children }) => {
    const router = useRouter()
    const user = useContext(AuthContext).currentUser

    if (user === undefined) {
        // useEffect(() => {
            // router.replace('/signin')
        // }, [])
        // router.replace('/signin')
        return (<Loading />)
    } else if (user === null) {
        router.replace('/signin')
        return (<p>未ログイン(null)</p>)
    } else {
        return <>{children}</>
    }
}

export default AuthGuard
