import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { RegsiterNewUser, auth, getUserInfo, userExist } from "../firebase/firebase";

export default function Authprovider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister }) {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegister = await userExist(user.uid)
                if (isRegister) {
                    const userInfo = await getUserInfo(user.uid)
                    // console.log(userInfo);
                    if (userInfo) {
                        onUserLoggedIn(userInfo);
                    } else {
                        onUserNotRegister(userInfo);
                    }
                } else {
                    await RegsiterNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        profilePicture: user.photoURL,
                        emailVerified: true,
                    })
                    onUserNotRegister(user)
                    // console.log(user);
                }
            } else {
                onUserNotLoggedIn();
                console.log("No hay Usuarios Conectados...");
            }
        })
    }, [onUserLoggedIn, onUserNotRegister, onUserNotLoggedIn, navigate])

    return (
        <>
            <div>{children}</div>
        </>
    )
}