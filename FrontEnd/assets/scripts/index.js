import { getWorks, getCat } from "./comAPI.js";

const setWorks = async () => {
    const works = await getWorks();
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
    const categories = await getCat();
    const filters = document.getElementById("filters");
    const filtersList = document.createElement("ul");
    const filter = document.createElement("li");
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
    filters.appendChild(filtersList);
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

setWorks();
setFilters();