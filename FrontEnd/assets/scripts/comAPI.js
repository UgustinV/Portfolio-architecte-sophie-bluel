export const getItems = async (type) => {
    try{
        const response = await fetch("http://localhost:5678/api/" + type, {
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
    }
}

export const getToken = async (email, password) => {
    try{
        const response = await fetch("http://localhost:5678/api/users/login", {
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
    }
}

export const deleteItems = async (token, id) => {
    try{
        const response = await fetch("http://localhost:5678/api/works/" + id, {
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
    }
}

export const addWork = async (token, formData) => {
    try{
        const response = await fetch("http://localhost:5678/api/works/", {
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
    }
}

export default {getItems, getToken, deleteItems, addWork};