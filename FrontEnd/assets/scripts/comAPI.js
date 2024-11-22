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
    console.log(JSON.stringify({email, password}));
    try{
        const response = await fetch("http://localhost:5678/api/users/login", {
            method : 'POST',
            headers : {
                'accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({email, password})
        });
        
        if(response.ok){
            return response.json();
        }
        else{
            return response.json();
        }
    }
    catch(error) {
        console.error("Error while getting token : ", error);
    }
}

export default {getItems, getToken};