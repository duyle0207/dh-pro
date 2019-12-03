import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = React.createContext({})


export default function Auth({ children }) {
    // Declare a new state variable, which we'll call "count"
    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {
        // setisAuthenticated(true);
        CheckAuthAdmin();
        console.log(isAuthenticated);
    })

    async function CheckAuthAdmin() {
        if (JSON.parse(localStorage.getItem("adminInfo")) === null) {
            localStorage.setItem("adminInfo", JSON.stringify({}));
        }
        if (Object.keys(JSON.parse(localStorage.getItem("adminInfo"))).length === 0) {
            setisAuthenticated(false);
        }
        else {
            const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
            setisAuthenticated(isTokenValid);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

