
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
    document.getElementById("loader").style.display = "block";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
    const mealdata = await response.json();
    document.getElementById("loader").style.display = "none";
    console.log(mealdata.meals);
    DisplayMeal(mealdata.meals)
}


function DisplayMeal(data) {
    const meal = document.querySelector(".meal")
    const mealtitle = document.querySelector(".mealtitle")
    let mealproducrts = "";
    let title = `<h1>MEALS</h1>
        <div class="line"></div>`;
    data.forEach((prod) => {
        mealproducrts += `
        <div id="mealprod">
        <h5 id="title">${prod.strCategory}</h5>
        <img src="${prod.strMealThumb}" alt="">
        <span id="origin">Dish Origin: ${prod.strArea}</span>
         <h5 id="dish">Dish Name: ${prod.strMeal}</h5>
        </div>`
    })
    mealtitle.innerHTML = title
    meal.innerHTML = mealproducrts
}


function searchMeal(prod) {
    const errormsg = document.querySelector("#errormsg")
    const filterproducts = document.querySelector("#filterproducts");
    const searchIcon = document.querySelector(".search-icon");
    let result = "";

    filterproducts.addEventListener("keyup", () => {
        result = filterproducts.value;

        if (result.length === 0) {
            document.querySelector(".meal").innerHTML = "";
            document.querySelector(".mealtitle").innerHTML = "";
            errormsg.style.display = "none";
        }

    });
    searchIcon.addEventListener("click", () => {
        if (result.length > 0) {
            mealfetch(result);
        }
        else {
            errormsg.innerHTML = "please enter a recipe name!"
            errormsg.style.display = "block";

        }
    })
}
searchMeal();






