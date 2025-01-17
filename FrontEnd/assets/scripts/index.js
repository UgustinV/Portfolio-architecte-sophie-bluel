import { getItems } from "./comAPI.js";
import { deletableWorks, setCategoriesSelect, toggleModale, setModaleForm } from "./modale.js";

const gallery = document.getElementById("gallery");
const filtersContainer = document.getElementsByClassName("portfolio-head-filters");
const filters = document.getElementsByClassName("filter");
const editElements = document.getElementsByClassName("editing-mode");
const categoriesOptions = document.querySelector("#add-photo-form select");
const logInOutButton = document.querySelector("ul li:nth-of-type(3) a");

// Displays all available works on the index page
const setWorks = async () => {
    const works = await getItems("works");
    works.forEach(element => {
        const work = document.createElement("figure");
        const image = document.createElement("img");
        const caption = document.createElement("figcaption");
        image.src = element.imageUrl;
        image.alt = element.title;
        caption.textContent = element.title;
        work.setAttribute("apiid", element.id);
        work.append(image, caption);
        work.setAttribute("category", element.category.id)
        gallery.appendChild(work);
    });
    
    deletableWorks(works);
}

const setFilters = async () => {
    const categories = await getItems("categories");
    const filterNav = document.createElement("nav");
    const filtersList = document.createElement("ul");
    const filter = document.createElement("li");
    filterNav.id = "filters";
    filter.textContent = "Tous";
    filter.classList.add("filter", "active-filter");
    filter.id = "0"
    filtersList.appendChild(filter);
    categories.forEach(category => {
        const categoryOption = document.createElement("option");
        categoryOption.value = category.id;
        categoryOption.textContent = category.name;
        const filter = document.createElement("li");
        filter.textContent = category.name;
        filter.className = "filter";
        filter.id = category.id;
        filtersList.appendChild(filter);
        categoriesOptions.appendChild(categoryOption);
    });
    filterNav.appendChild(filtersList);
    filtersContainer[0].appendChild(filterNav);
    Array.from(filters).forEach(filter => {
        filter.addEventListener("click", () => changeFilter(filter.id));
    });
}

const changeFilter = async (type) => {
    const works = gallery.children;
    Array.from(works).forEach(work => {
        if(type !== "0" && work.getAttribute("category") !== type){
            work.classList.add("hidden");
        }
        else{
            work.classList.remove("hidden");
        }
    });
    Array.from(filters).forEach(filter => {
        if(filter.id === type){
            filter.classList.add("active-filter");
        }
        else{
            filter.classList.remove("active-filter");
        }
    });
}

const toggleLogin = () => {
    logInOutButton.textContent = "logout";
    logInOutButton.href = "#";
    logInOutButton.addEventListener("click", (event) => {
        if(isLoggedIn()) {
            event.preventDefault();
        }
        window.localStorage.removeItem("token");
        logInOutButton.href = "./login.html";
        logInOutButton.textContent = "login";
        toggleEditing();
        setFilters();
    });
}

const toggleEditing = () => {
    if(isLoggedIn()) {
        toggleModale();
        setModaleForm();
    }
    else {
        Array.from(editElements).forEach(element => {
            element.classList.add("hidden");
        });
    }
}

const isLoggedIn = () => {
    return window.localStorage.getItem("token");
}

const setPage = () => {
    setWorks();
    if(isLoggedIn()){
        toggleLogin();
        toggleEditing();
        setCategoriesSelect();
    }
    else{
        setFilters();
    }
}

setPage();