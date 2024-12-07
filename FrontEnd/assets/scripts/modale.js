import { getItems, deleteItems } from "./comAPI.js";

const editElements = document.getElementsByClassName("toggle-edit");
const closingButtons = document.getElementsByClassName("closing-button");
const backButton = document.getElementById("back-button");
const modale = document.getElementById("modale");
const changePage = document.getElementById("display-add-photo");
const fileInput = document.getElementById("photo-import");
const fileInputContainer = document.getElementById("photo-input");
const deleteElem = document.getElementById("delete-elem");
const addElem = document.getElementById("add-elem");
const categoriesOptions = document.querySelector("#add-photo-form select");
const fileInputContent = document.querySelectorAll("#photo-input > *");
const formInput = document.getElementsByClassName("form-input");
const form = document.getElementById("add-photo-form");

export const toggleModale = () => {
    Array.from(editElements).forEach(element => {
        element.style.display = "flex";
        element.addEventListener("click", () => {
            modale.style.display = "flex";
            deleteElem.style.display = "flex";
            addElem.style.display = "none";
        });
    });
    backButton.addEventListener("click", () => {
        deleteElem.style.display = "flex";
        addElem.style.display = "none";
        resetImageInputForm();
    })
    Array.from(closingButtons).forEach(element => {
        element.addEventListener("click", () => {
            modale.style.display = "none";
            deleteElem.style.display = "flex";
            addElem.style.display = "none";
            resetImageInputForm();
        });
    });
    modale.addEventListener("click", (event) => {
        if(event.target === modale){
            modale.style.display = "none";
            resetImageInputForm();
        }
    });
    changePage.addEventListener("click", () => {
        deleteElem.style.display = "none";
        addElem.style.display = "flex";
    });
}

// Sets all the available works in the modale to allow user to delete them
export const deletableWorks = (works) => {
    const editGallery = document.getElementById("photos-container");
    works.forEach(element => {
        const editImageContainer = document.createElement("div");
        const editImage = document.createElement("img");
        const deleteButton = document.createElement("img");
        deleteButton.src = "./assets/icons/trash-can.svg";
        deleteButton.alt = "Supprimer";
        deleteButton.setAttribute("apiid", element.id);
        deleteButton.classList.add("delete-button");
        editImage.src = element.imageUrl;
        editImage.alt = element.title;
        editImageContainer.setAttribute("apiid", element.id);
        editImageContainer.appendChild(editImage);
        editImageContainer.appendChild(deleteButton);
        editGallery.appendChild(editImageContainer);
        deleteButton.addEventListener("click", async () => {
            const response = await deleteItems(window.localStorage.getItem("token"), element.id);
            if(response === 204){
                const deletedElements = document.querySelectorAll("[apiid='" + element.id + "']");
                Array.from(deletedElements).forEach(elm => {
                    elm.remove();
                });
            }
        });
    });
}

export const setCategoriesSelect = async () => {
    const categories = await getItems("categories");
    const defaultOption = document.createElement("option");
    defaultOption.selected;
    defaultOption.disabled;
    categoriesOptions.appendChild(defaultOption);
    categories.forEach(category => {
        const categoryOption = document.createElement("option");
        categoryOption.value = category.id;
        categoryOption.textContent = category.name;
        categoriesOptions.appendChild(categoryOption);
    });
}

export const setModaleForm = () => {
    fileInput.addEventListener("change", (event) => {
        Array.from(fileInputContent).forEach(elm => {
            elm.style.display = "none";
        })
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement("img");
            preview.src = e.target.result;
            preview.id = "preview-image";
            fileInputContainer.appendChild(preview);
        }
        reader.readAsDataURL(file);
    });
}

const resetImageInputForm = () => {
    form.reset();
    Array.from(fileInputContent).forEach(elm => {
        elm.style.removeProperty("display");
    });
    if(document.getElementById("preview-image")){
        const previewImage = document.getElementById("preview-image");
        fileInputContainer.removeChild(previewImage);
    }
}

export default {deletableWorks, toggleModale, setCategoriesSelect, setModaleForm};