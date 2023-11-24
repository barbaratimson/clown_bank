import React, { useEffect, useState } from "react"
import {useSearchParams} from "react-router-dom";
import queryString from "query-string";
import {CODE_CHALLENGE, CODE_CHALLENGE_METHOD, CODE_VERIFIER} from "../utils/PKCEconfigs";
import axios from "axios";
const KEYCLOAK_ID = process.env.REACT_APP_KEYCLOAK_ID
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI

function KeycloakAuth() {
        const [params,setSearchParams] = useSearchParams()
        const [code,setCode] = useState(params.get("code"))
        const [authResponse,setAuthResponse] = useState<any>()
                let keycloakAuth = queryString.stringifyUrl({
                    url: `http://localhost:8080/realms/bank-app/protocol/openid-connect/auth`,
                    query: {
                        client_id: KEYCLOAK_ID,
                        redirect_uri: REDIRECT_URI,
                        response_type: 'code',
                        scope: [
                            'openid',
                            'profile',
                        ].join(" "),
                        state: JSON.stringify({ provider: 'Keycloak' }),
                        code_challenge: CODE_CHALLENGE,
                        code_challenge_method: CODE_CHALLENGE_METHOD
                    }
                });


    const getToken = async (code:any) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/realms/bank-app/protocol/openid-connect/token`,{
                    client_id: KEYCLOAK_ID,
                    code: code,
                    grant_type: 'authorization_code',
                    redirect_uri: REDIRECT_URI,
                    code_verifier: CODE_VERIFIER,
                    state: JSON.stringify({ provider: 'Keycloak' }),
                },{headers:{
                        "Content-Type":'application/x-www-form-urlencoded'
                    }});
            setAuthResponse(response.data)
            localStorage.setItem("token","Bearer " + response.data.access_token)
            window.location.assign("/profile")
        } catch (err) {
            console.error('Ошибка при получении списка треков:', err);
            console.log(err)
        }
    };
    useEffect(() => {
        if(params.size === 0) {
            window.location.assign(keycloakAuth)
        } else {
            getToken(code)
            }
    }, []);

    // TODO: Login animation
    return (
        <>

        </>
    );
}

export default KeycloakAuth;
