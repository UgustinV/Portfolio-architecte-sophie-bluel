import { getItems } from "./comAPI.js";

const setWorks = async () => {
    const works = await getItems("works");
    const gallery = document.getElementById("gallery");
    works.forEach(element => {
        const work = document.createElement("figure");
        const image = document.createElement("img");
        const caption = document.createElement("figcaption");
        image.src = element.imageUrl;
        image.alt = element.title;
        caption.textContent = element.title;
        work.append(image, caption);
        work.setAttribute("category", element.category.id)
        gallery.appendChild(work);
    });
}

const setFilters = async () => {
    const categories = await getItems("categories");
    const filters = document.getElementsByClassName("portfolio-head-filters");
    const filterNav = document.createElement("nav");
    const filtersList = document.createElement("ul");
    const filter = document.createElement("li");
    filterNav.id = "filters";
    filter.textContent = "Tous";
    filter.classList.add("filter", "active-filter");
    filter.id = "0"
    filtersList.appendChild(filter);
    categories.forEach(category => {
        const filter = document.createElement("li");
        filter.textContent = category.name;
        filter.className = "filter";
        filter.id = category.id;
        filtersList.appendChild(filter);
    });
    filterNav.appendChild(filtersList);
    filters[0].appendChild(filterNav);
    const filterList = document.getElementsByClassName("filter");
    Array.from(filterList).forEach(filter => {
        filter.addEventListener("click", () => changeFilter(filter.id));
    });
}

const changeFilter = async (type) => {
    const filters = document.getElementsByClassName("filter");
    const gallery = document.getElementById("gallery");
    const works = gallery.children;
    Array.from(works).forEach(work => {
        if(type !== "0" && work.getAttribute("category") !== type){
            work.style.display = "none";
        }
        else{
            work.style.display = "";
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

const isLoggedIn = () => {
    const logInOutButton = document.querySelector("ul li:nth-of-type(3) a");
    logInOutButton.textContent = "logout";
    logInOutButton.href = "#";
    logInOutButton.addEventListener("click", (event) => {
        if(window.localStorage.getItem("token")) {
            event.preventDefault();
        }
        window.localStorage.removeItem("token");
        logInOutButton.href = "./login.html";
        logInOutButton.textContent = "login";
        setEditing();
        setFilters();
    });
}

const setEditing = () => {
    const editElements = document.getElementsByClassName("no-edit");
    if(window.localStorage.getItem("token")) {
        Array.from(editElements).forEach(element => {
            element.style.display = "flex";
        });
    }
    else {
        Array.from(editElements).forEach(element => {
            element.style.display = "none";
        });
    }
}

const setPage = () => {
    if(window.localStorage.getItem("token")){
        isLoggedIn();
        setWorks();
        setEditing();
    }
    else{
        setWorks();
        setFilters();
    }
}

setPage();