const selectedCategory = localStorage.getItem("selectedCategory");
const selectedDescription = localStorage.getItem("selectedDescription")


async function fetchingCategoryData(Category) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    const resultData = await response.json();
    console.log(resultData.meals);
    DisplaycatData(resultData.meals)
}

fetchingCategoryData(selectedCategory, selectedDescription);

function DisplaycatData(products) {
    const mealDescription = document.querySelector(".mealDescription")
    const category = document.querySelector(".category")
    const mealtitle = document.querySelector(".mealtitle")
    let CatData = "";
    let CatDescription = `<div class="description box">
    <h2 id="Destitle">${selectedCategory}</h2>
    <p>${selectedDescription}</p></div>`
    let title = `<h1>MEALS</h1>
        <div class="line"></div>`;
    products.forEach((prod) => {
        CatData += `<div class="CatDataCards" Data-Detailes="${prod.idMeal}">
                <img src="${prod.strMealThumb}" alt="${prod.strMeal}">
                <h5 class="catTitle">${prod.strMeal}</h5>
                </div>`
    })
    mealDescription.innerHTML = CatDescription
    mealtitle.innerHTML = title
    category.innerHTML = CatData
    document.querySelectorAll(".CatDataCards").forEach((card)=>{
        card.addEventListener("click",()=>{
            const Card_Id =card.getAttribute("Data-Detailes");

            localStorage.setItem("clickedId",Card_Id)

            window.location.href="Details.html";
        })

    })
}

// Hamburger in navbar
const DropDownIcon = document.querySelector(".DropDownIcon")
const menu = document.querySelector(".DropdownMenu")
const icon = document.querySelector(".DropdownMenu .icon i")
DropDownIcon.addEventListener("click", () => {
    menu.classList.add("show");
});
icon.addEventListener("click", () => {
    menu.classList.remove("show");
});

async function loadDropdown() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = await res.json();

    const dropdownList = document.querySelector(".dropdown-list");
    let listItems = "";

    data.categories.forEach(cat => {
        listItems += `
            <li 
                data-category="${cat.strCategory}" 
                data-description="${cat.strCategoryDescription}">
                ${cat.strCategory}
            </li>
        `;
    });

    dropdownList.innerHTML = listItems;

    // Add click listeners
    document.querySelectorAll(".dropdown-list li").forEach(item => {
        item.addEventListener("click", () => {
            const categoryName = item.getAttribute("data-category");
            const description = item.getAttribute("data-description");

            localStorage.setItem("selectedCategory", categoryName);
            localStorage.setItem("selectedDescription", description);

            window.location.href = "category.html";
        });
    });
}

loadDropdown();

