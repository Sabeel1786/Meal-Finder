
async function fetchData() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data = await response.json()
    console.log(data.categories);
    DataDisplay(data.categories)
}
fetchData()


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


const DropDownIcon = document.querySelector(".DropDownIcon")
const menu = document.querySelector(".DropdownMenu")
const icon = document.querySelector(".DropdownMenu .icon i")
DropDownIcon.addEventListener("click", () => {
    menu.classList.add("show");
});
icon.addEventListener("click", () => {
    menu.classList.remove("show");
});




