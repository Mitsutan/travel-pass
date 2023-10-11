import { AuthContext } from "@/app/lib/firebase/auth/auth-provider"
import { usePathname, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

const AuthGuard = ({ children }) => {
    const router = useRouter()
    const user = useContext(AuthContext).currentUser

    if (user === undefined) {
        useEffect(() => {
            router.replace('/signin')
        }, [])
        // router.replace('/signin')
        return null
    } else if (user === null) {
        router.replace('/signin')
        return null
    } else {
        return <>{children}</>
    }
}

export default AuthGuard
