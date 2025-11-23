const selectedCategory = localStorage.getItem("selectedCategory");


async function fetchingCategoryData(Category) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    const resultData = await response.json();
    console.log(resultData.meals);
    DisplaycatData(resultData.meals)
}

fetchingCategoryData(selectedCategory);

function DisplaycatData(products) {
    const category = document.querySelector(".category")
    const mealtitle = document.querySelector(".mealtitle")
    let CatData = "";
    let title = `<h1>MEALS</h1>
        <div class="line"></div>`;
    products.forEach((prod) => {
        CatData += `<div class="CatDataCards">
                <img src="${prod.strMealThumb}" alt="${prod.strMeal}">
                <h5 class="catTitle">${prod.strMeal}</h5>
                </div>`
    })
    mealtitle.innerHTML = title
    category.innerHTML = CatData
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

const dropdownItems = document.querySelectorAll(".dropdown-list li");

dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
        const categoryName = item.getAttribute("data-category");

        // Save to localStorage
        localStorage.setItem("selectedCategory", categoryName);

        // Redirect to category page
        window.location.href = "category.html";
    });
});
