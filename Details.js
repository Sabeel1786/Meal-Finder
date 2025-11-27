// Details data fetch
const clickedId =localStorage.getItem("clickedId");

async function DetailsData(ID) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
    const Ddata = await response.json();
    console.log(Ddata.meals);
    DisplayDdata(Ddata.meals)
}
DetailsData(clickedId)

function DisplayDdata(products) {
    const Details = document.querySelector(".Details");
    const Dtitle = document.querySelector(".Dtitle")
    let Detailproducts = "";
    products.forEach((prod) => {
        // Get ingredients + measurements (20 max)
        let ingredientsHTML = "";
        let measuresHTML = "";
        for (let i = 1; i <= 20; i++) {
            let ingredient = prod[`strIngredient${i}`];
            let measure = prod[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredientsHTML += `<li>${ingredient}</li>`;
                measuresHTML += `<li><i class="fa-solid fa-spoon"></i> ${measure}</li>`;
            }
        }
        Dtitle.innerHTML = prod.strMeal
        let instructionsLinesHtml = "";
        let instructionsLinesArray = prod.strInstructions.split("\n");
        instructionsLinesArray.forEach((step) => {
            if (step.trim() !== "") {
                instructionsLinesHtml += `<li><i class="fa-regular fa-square-check"></i>${step}</li>`
            }
        })
        Detailproducts += `<div class="DetailContainer">
            <div class="cardImage"><img src="${prod.strMealThumb}" alt=""></div>
            <div class="cardDetails">
                <h1>${prod.strMeal}</h1>
                <div class="h1line"></div>
                <div class="D_Category"><b>CATEGORY</b> :${prod.strCategory}</div>
                <div class="source"><b>Source</b> :${prod.strSource}</div>
                <div class="Tags"><b>Tags</b>:
                    <ul>
                        <li>${prod.strTags || "No Tags"}</li>
                    </ul>
                </div>
                <div class="Ingredients">
                    <span><b>Ingredients</b></span>
                    <ol>
                        ${ingredientsHTML}
                    </ol>
                </div>
            </div>
        </div>
        <div class="measure">
        <span><b>Measure :</b></span>
            <div class="measureContainer">
                <ul>
                    ${measuresHTML}
                </ul>
            </div>
        </div>
        <div class="instructions">
        <span><b>Instructions :</b></span>
            <ul>
                ${instructionsLinesHtml}
            </ul>
        </div>`
    })
    Details.innerHTML = Detailproducts;

}

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
        <div class="CategoryProducts" data-category="${prod.strCategory}" data-description="${prod.strCategoryDescription}">
        <h5 id="title">${prod.strCategory}</h5>
        <img src="${prod.strCategoryThumb}" alt="${prod.strCategory}">
        </div>`;
    })
    Category.innerHTML = product
    document.querySelectorAll(".CategoryProducts").forEach(card => {
        card.addEventListener("click", () => {
            const categoryName = card.getAttribute("data-category");
            const Description = card.getAttribute("data-description")

            // Save category in localStorage
            localStorage.setItem("selectedCategory", categoryName);
            localStorage.setItem("selectedDescription", Description)

            // Go to next page
            window.location.href = "category.html";
        });
    });

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