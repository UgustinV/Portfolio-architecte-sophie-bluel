export const getWorks = async () => {
    const header = {
        method : 'GET',
        headers : {'accept' : 'application/json'}
    }
    return await fetch("http://localhost:5678/api/works", header)
    .then(response => response.json())
    .then(data => {
        return data;
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
    });
}

export default {getWorks, getCat};