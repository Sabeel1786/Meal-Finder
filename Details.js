// Details data fetch
async function DetailsData(ID) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
    const Ddata = await response.json();
    console.log(Ddata.meals);
    DisplayDdata(Ddata.meals)
}
DetailsData(53077)

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
                measuresHTML += `<li>${measure}</li>`;
            }
        }
        let instructionsLinesHtml = "";
        let instructionsLinesArray = prod.strInstructions.split("\n");
        instructionsLinesArray.forEach((step) => {
            if (step.trim() !== "") {
                instructionsLinesHtml += `<li>${step}</li>`
            }
        })
        Detailproducts += `<div class="DetailContainer">
            <div class="cardImage"><img src="${prod.strMealThumb}" alt=""></div>
            <div class="cardDetails">
                <h1>${prod.strMeal}</h1>
                <div class="h1line"></div>
                <div class="D_Category">CATEGORY :${prod.strCategory}</div>
                <div class="source">Source :${prod.strSource}</div>
                <div class="Tags">
                    <ul>
                        <li>${prod.strTags || "No Tags"}</li>
                    </ul>
                </div>
                <div class="Ingredients">
                    <span>Ingredients</span>
                    <ol>
                        <li>${ingredientsHTML}
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="measure">
            <div class="measureContainer">
                <ul>
                    <li>${measuresHTML}</li>
                </ul>
            </div>
        </div>
        <div class="instructions">
            <ul>
                ${instructionsLinesHtml}
            </ul>
        </div>`
    })
    Details.innerHTML = Detailproducts;

}
