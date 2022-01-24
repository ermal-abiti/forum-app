import getCookie from "./getCookie";
import axios from "axios";

export default async function isAuth() {
    try {

        const result = await axios.get(process.env.VUE_APP_API_URL + "/users/isloggedin", {
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