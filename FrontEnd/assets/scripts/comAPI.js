export const getWorks = async () => {
    const header = {
        method : 'GET',
        headers : {'accept' : 'application/json'}
    }
    return await fetch("http://localhost:5678/api/works", header)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Failed to fetch works : ', error);
    });
}

export const getCat = async () => {
    const header = {
        method : 'GET',
        headers : {'accept' : 'application/json'}
    }
    return await fetch("http://localhost:5678/api/categories", header)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Failed to fetch category : ', error);
    });
}

export default {getWorks, getCat};