import { getItems, deleteItems, addWork } from "./comAPI.js";
import { triggerToast } from "./toast.js";

const editElements = document.getElementsByClassName("editing-mode");
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
const form = document.getElementById("add-photo-form");
const formButton = document.getElementById("submit-photo");
const gallery = document.getElementById("gallery");
const editGallery = document.getElementById("photos-container");
const maxSize = 4194304;
const blurFilter = "blur(1px) saturate(0.6)";

const toggleDisplayModale = () => {
    if(!modale.classList.contains("hidden")){
        modale.classList.add("hidden");
        deleteElem.classList.add("hidden");
        addElem.classList.add("hidden");
        resetImageInputForm();
    }
    else{
        modale.classList.remove("hidden");
        deleteElem.classList.remove("hidden");
    }
}

const updateWorks = async (id) => {
    const works = await getItems("works");
    works.forEach(element => {
        if(element.id === id){
            const work = document.createElement("figure");
            const image = document.createElement("img");
            const caption = document.createElement("figcaption");
            const editImageContainer = document.createElement("div");
            const editImage = document.createElement("img");
            const deleteButton = document.createElement("img");
            const confirmButton = document.createElement("img");
            const cancelButton = document.createElement("img");
            image.src = element.imageUrl;
            image.alt = element.title;
            caption.textContent = element.title;
            work.setAttribute("apiid", element.id);
            work.append(image, caption);
            work.setAttribute("category", element.category.id)
            gallery.appendChild(work);
            deleteButton.src = "./assets/icons/trash-can.svg";
            deleteButton.alt = "Supprimer";
            deleteButton.setAttribute("apiid", element.id);
            deleteButton.classList.add("delete-button");
            editImage.src = element.imageUrl;
            editImage.alt = element.title;
            cancelButton.src = "./assets/icons/close-button.svg";
            cancelButton.alt = "Annuler";
            cancelButton.setAttribute("apiid", element.id);
            cancelButton.classList.add("delete-cancel", "delete-verification", "hidden");
            confirmButton.src = "./assets/icons/checked-checkbox.svg";
            confirmButton.alt = "Supprimer";
            confirmButton.setAttribute("apiid", element.id);
            confirmButton.classList.add("delete-confirm",  "delete-verification", "hidden");
            editImage.src = element.imageUrl;
            editImage.alt = element.title;
            editImageContainer.setAttribute("apiid", element.id);
            editImageContainer.appendChild(editImage);
            editImageContainer.appendChild(deleteButton);
            editImageContainer.appendChild(cancelButton);
            editImageContainer.appendChild(confirmButton);
            editGallery.appendChild(editImageContainer);
            deleteButton.addEventListener("click", () => {
                deleteButton.classList.add("hidden");
                cancelButton.classList.remove("hidden");
                confirmButton.classList.remove("hidden");
                editImage.style.filter = blurFilter;
            })
            cancelButton.addEventListener("click", () => {
                deleteButton.classList.remove("hidden");
                cancelButton.classList.add("hidden");
                confirmButton.classList.add("hidden");
            })
            confirmButton.addEventListener("click", async () => {
                const response = await deleteItems(window.localStorage.getItem("token"), element.id);
                if(response === 204){
                    const deletedElements = document.querySelectorAll("[apiid='" + element.id + "']");
                    Array.from(deletedElements).forEach(elm => {
                        elm.remove();
                    });
                }
            });
        }
    });
}

export const toggleModale = () => {
    Array.from(editElements).forEach(element => {
        element.classList.remove("hidden");
        element.addEventListener("click", toggleDisplayModale);
    });
    backButton.addEventListener("click", () => {
        deleteElem.classList.remove("hidden");
        addElem.classList.add("hidden");
        resetImageInputForm();
    })
    Array.from(closingButtons).forEach(element => {
        element.addEventListener("click", toggleDisplayModale);
    });
    modale.addEventListener("click", (event) => {
        if(event.target === modale){
            toggleDisplayModale();
        }
    });
    changePage.addEventListener("click", () => {
        deleteElem.classList.add("hidden");
        addElem.classList.remove("hidden");
    });
}

// Sets all the available works in the modale to allow user to delete them
export const deletableWorks = (works) => {
    works.forEach(element => {
        const editImageContainer = document.createElement("div");
        const editImage = document.createElement("img");
        const confirmButton = document.createElement("img");
        const cancelButton = document.createElement("img");
        const deleteButton = document.createElement("img");
        deleteButton.src = "./assets/icons/trash-can.svg";
        deleteButton.alt = "Supprimer";
        deleteButton.setAttribute("apiid", element.id);
        deleteButton.classList.add("delete-button");
        editImage.src = element.imageUrl;
        editImage.alt = element.title;
        cancelButton.src = "./assets/icons/close-button.svg";
        cancelButton.alt = "Annuler";
        cancelButton.setAttribute("apiid", element.id);
        cancelButton.classList.add("delete-cancel", "delete-verification", "hidden");
        confirmButton.src = "./assets/icons/checked-checkbox.svg";
        confirmButton.alt = "Supprimer";
        confirmButton.setAttribute("apiid", element.id);
        confirmButton.classList.add("delete-confirm",  "delete-verification", "hidden");
        editImage.src = element.imageUrl;
        editImage.alt = element.title;
        editImageContainer.setAttribute("apiid", element.id);
        editImageContainer.appendChild(editImage);
        editImageContainer.appendChild(deleteButton);
        editImageContainer.appendChild(cancelButton);
        editImageContainer.appendChild(confirmButton);
        editGallery.appendChild(editImageContainer);
        deleteButton.addEventListener("click", () => {
            deleteButton.classList.add("hidden");
            cancelButton.classList.remove("hidden");
            confirmButton.classList.remove("hidden");
            editImage.style.filter = blurFilter;
        })
        cancelButton.addEventListener("click", () => {
            deleteButton.classList.remove("hidden");
            cancelButton.classList.add("hidden");
            confirmButton.classList.add("hidden");
            editImage.style.filter = "";
        })
        confirmButton.addEventListener("click", async () => {
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
        const file = event.target.files[0];
        if(file.size > maxSize){
            triggerToast("Taille de fichier trop élevée");
        }
        else{
            Array.from(fileInputContent).forEach(elm => {
                elm.style.display = "none";
            })
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.createElement("img");
                preview.src = e.target.result;
                preview.id = "preview-image";
                fileInputContainer.appendChild(preview);
            }
            reader.readAsDataURL(file);
        }
    });
}

const checkFilled = () => {
    const inputs = document.querySelectorAll("#add-photo-form *[required]");
    const formIsValid = Array.from(inputs).every(input => input.checkValidity());
    const fileInput = document.getElementById("photo-import").files[0];
    const fileIsValid = fileInput ? fileInput.size <= maxSize : false;
    if(formIsValid && fileIsValid){
        formButton.disabled = false;
        formButton.classList.remove("disabled-add-photo");
        formButton.classList.add("add-photo");
    }
    else {
        formButton.disabled = true;
        formButton.classList.add("disabled-add-photo");
        formButton.classList.remove("add-photo");
    }
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
    formButton.disabled = true;
    formButton.classList.add("disabled-add-photo");
    formButton.classList.remove("add-photo");
}

form.addEventListener("input", checkFilled);
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const response = await addWork(window.localStorage.getItem("token"), formData);
    if(response.id){
        updateWorks(response.id);
        toggleDisplayModale();
    }
});

export default {deletableWorks, toggleModale, setCategoriesSelect, setModaleForm};