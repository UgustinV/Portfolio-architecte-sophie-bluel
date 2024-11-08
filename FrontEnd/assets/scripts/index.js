import getWorks from "./getWorks.js";

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
        work.appendChild(image);
        work.appendChild(caption)
        gallery.appendChild(work)
    });
}

setWorks();