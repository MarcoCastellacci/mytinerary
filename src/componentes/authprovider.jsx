import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { RegsiterNewUser, auth, getUserInfo, userExist } from "../firebase/firebase";

export default function Authprovider({ children, onUserLoggedIn, onUserNotLoggedIn }) {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegister = await userExist(user.uid)
                if (isRegister) {
                    const userInfo = await getUserInfo(user.uid)
                    // console.log(userInfo);
                    onUserLoggedIn(userInfo);
                } else {
                    console.log(user);
                    await RegsiterNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        profilePicture: user.photoURL,
                        emailVerified: true,
                    })
                    console.log(user);
                    onUserLoggedIn(user)
                }
            } else {
                onUserNotLoggedIn();
                console.log("No hay Usuarios Conectados...");
            }
        })
    }, [onUserLoggedIn, onUserNotLoggedIn, navigate])

    return (
        <>
            <div>{children}</div>
        </>
    )
}