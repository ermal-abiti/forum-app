import getCookie from "./getCookie";
import axios from "axios";

export default async function isAuth() {
    // axios.get("http://localhost:5050/api/users/isloggedin", {
    //     headers: {
    //         "token": getCookie("token"),
    //         "userid": getCookie("userid")
    //     }
    // })
    // .then(res=> {
    //     return res.data.auth;
    // })
    try {

        const result = await axios.get("http://localhost:5050/api/users/isloggedin", {
            headers: {
                "token": getCookie("token")
            }
        })
        if (result.data.auth) {
            return result.data.auth

        }
        return {auth: false}
    }
    catch (err){
        return false
    }

    
    
}