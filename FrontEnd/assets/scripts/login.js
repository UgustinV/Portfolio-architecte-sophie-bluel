import { getToken } from "./comAPI.js";
import { triggerToast } from "./toast.js";


const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const response = await getToken(event.target.email.value, event.target.password.value);
    if(response.token){
        window.localStorage.setItem("token", response.token);
        window.location.href = './index.html'
    }
    else{
        triggerToast("Identifiant ou mot de passe incorrect.");
    }
});