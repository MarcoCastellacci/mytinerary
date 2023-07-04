import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { auth, getUserInfo, userExist } from "../firebase/firebase";

export default function Authprovider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister }) {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegister = await userExist(user.uid)
                if (isRegister) {
                    const userInfo = await getUserInfo(user.uid)
                    if (userInfo.emailVerified) {
                        onUserLoggedIn(userInfo);
                    } else {
                        onUserNotRegister(userInfo);
                    }
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