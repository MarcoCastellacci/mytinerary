import React, { useState } from 'react';
// import Carrousel from '../components/Carrousel';
import CallToAction from '../componentes/banner';

import '../style/index.css';
import Authprovider from '../componentes/authprovider';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

export default function Index() {
    const navigate = useNavigate()
    const [userState, setUserState] = useState("")

    async function handleUserLoggedIn(user) {
        setUserState("user")
        console.log(user);
    }
    async function handleUserNotRegister(user) {
        setUserState("notConfirmed")
        console.log(user);
    }
    async function handleUserNotLoggedIn() {
        navigate('/login')
        console.log(userState);
    }
    if (userState === "notConfirmed" || userState === "user") {
        return (
            <>
                <div className="main">
                    <div className="call">
                        <CallToAction />
                    </div>
                    {/* <div className="carrousel">
        <Carrousel />
    </div> */}
                </div>

            </>
        )
    }

    return <Authprovider onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegister={handleUserNotRegister}
        onUserNotLoggedIn={handleUserNotLoggedIn}>
        <div>Loadding... </div>
    </Authprovider>
}
