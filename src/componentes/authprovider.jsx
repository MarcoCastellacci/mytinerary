import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { auth, userExist } from "../firebase/firebase";

export default function Authprovider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister }) {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegister = await userExist(user.uid)
                if (isRegister) {
                    onUserLoggedIn(user)
                    // console.log(user);
                } else {
                    onUserNotRegister(user)
                    // console.log(user);
                }
            } else {
                onUserNotLoggedIn();
            }
        })
    }, [onUserLoggedIn, onUserNotRegister, onUserNotLoggedIn, navigate])

    return (
        <>
            <div>{children}</div>
        </>
    )
}