
async function fetchData() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data = await response.json()
    console.log(data.categories);
    DataDisplay(data.categories)
}
fetchData()

// fetching data to cards
function DataDisplay(products) {
    const Category = document.querySelector(".Category")
    let product = "";
    products.forEach((prod) => {
        product += `
        <div class="CategoryProducts">
        <h5 id="title">${prod.strCategory}</h5>
        <img src="${prod.strCategoryThumb}" alt="${prod.strCategory}">
        <a href="${prod.idCategory}"></a>
        </div>`;
    })
    Category.innerHTML = product
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




// search for meals
async function mealfetch(foodName) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
    const mealdata = await response.json();
    console.log(mealdata.meals);
    DisplayMeal(mealdata.meals)
}


function DisplayMeal(data) {
    const meal = document.querySelector(".meal")
    let mealproducrts = "";
    data.forEach((prod) => {
        mealproducrts += `<div id="mealprod">
        <h5 id="title">${prod.strCategory}</h5>
        <img src="${prod.strMealThumb}" alt="">
        <span id="origin">Dish Origin: ${prod.strArea}</span>
         <h5 id="dish">Dish Name: ${prod.strMeal}</h5>
        </div>`
    })
    meal.innerHTML = mealproducrts
}


function searchMeal(prod) {
    const filterproducts = document.querySelector("#filterproducts");
    const searchIcon = document.querySelector(".search-icon");
    let result = "";

    filterproducts.addEventListener("keyup", () => {
        result = filterproducts.value;

    });
    searchIcon.addEventListener("click", () => {
        if (result.length > 0) {
            mealfetch(result);
        }
    })
}
searchMeal();






