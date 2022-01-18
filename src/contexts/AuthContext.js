import React, { useContext, useState, useEffect } from "react";
import { auth } from '../firebase-config'
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut 
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setcurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // Sign In with Google
    function googleSignIn() {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    // Sign Out
    function userSignOut() {
        return signOut(auth)
    }

    const value = {
        currentUser,
        googleSignIn,
        userSignOut,
    }

    useEffect(() => {
        setLoading(true)
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


