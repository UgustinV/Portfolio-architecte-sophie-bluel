import { triggerToast } from "./toast.js";
const route = "http://localhost:5678/api/";

export const getItems = async (type) => {
    try{
        const response = await fetch(route + type, {
            method : 'GET',
            headers : {'accept' : 'application/json'}
        });

        if(response.ok){
            return response.json();
        }
        else{
            const errorMessage = response.json();
            return errorMessage.message;
        }
    }
    catch(error){
        console.error("Error while fetching data : ", error);
        triggerToast("Erreur de récupération des données");
    }
}

export const getToken = async (email, password) => {
    try{
        const response = await fetch(route + "users/login", {
            method : 'POST',
            headers : {
                'accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({email, password})
        });
        
        return response.json();
    }
    catch(error) {
        console.error("Error while getting token : ", error);
        triggerToast("Erreur d'optention du token");
    }
}

export const deleteItems = async (token, id) => {
    try{
        const response = await fetch(route + "works/" + id, {
            method : 'DELETE',
            headers : {
                'accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        return response.status;
    }
    catch(error) {
        console.error("Error while deleting item : ", error);
        triggerToast("Erreur de suppression de la photo");
    }
}

export const addWork = async (token, formData) => {
    try{
        const response = await fetch(route + "works/", {
            method : 'POST',
            headers : {
                'accept' : 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body : formData
        });
        return await response.json();
    }
    catch(error) {
        console.error("Error while adding item : ", error);
        triggerToast("Erreur d'ajout de la photo");
    }
}

export default {getItems, getToken, deleteItems, addWork};