import { cardsContainer } from "../main.js";

let mealScreen = $(".meal-screen");
let mealImg = $(".meal-screen img");
let mealName = $(".meal-screen h2");
let mealInstructions = $(".meal-screen p");
let mealArea = $("#area-span");
let mealCategory = $("#category-span");
let recipesDiv = $(".recipes");
let tagsDiv = $(".tags");
let SourceLink = $("#Source");
let YoutubeLink = $("#Youtube");

export function createCards(mealsArray) {
  let counter = 0;
for (let meal of mealsArray) {
  if (counter >= 20) break;
  counter++;
    let newCard = document.createElement("div");
    let cardContent = `
    <div class="card-box p-3 md:w-auto w-full">
            <div id="${meal.idMeal}" class="card meal-card w-11/12 h-96 md:size-36 lg:size-48 xl:size-60 2xl:size-72 relative">
              <img class="rounded h-full w-full object-cover object-center " src="${meal.strMealThumb}" />
              <div class="layer p-3 text-3xl rounded absolute top-0 w-full h-full bg-white opacity-75 flex items-center">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          </div>`;
    newCard.innerHTML = cardContent;
    cardsContainer.appendChild(newCard);
  }
}
export function createCategory(CategoryArray) {
  for (let Category of CategoryArray) {
    let newCard = document.createElement("div");
    let cardContent = `
    <div class="card-box p-3 md:w-auto w-full">
            <div id="${Category.strCategory}" class="card category-card  w-11/12 h-96 md:size-36 lg:size-48 xl:size-60 2xl:size-72 relative">
              <img class="rounded h-full w-full object-cover object-center " src="${Category.strCategoryThumb}" />
              <div class="layer text-center overflow-hidden p-3  rounded absolute top-0 w-full h-full bg-white opacity-75 ">
                <h3>${Category.strCategory}</h3>
                <p>${Category.strCategoryDescription}</p>
              </div>
            </div>
          </div>`;
    newCard.innerHTML = cardContent;
    cardsContainer.appendChild(newCard);
  }
}
export function createArea(areaArray) {
  for (let area of areaArray) {
    let newCard = document.createElement("div");
    let cardContent = `
  <div class="card-box p-3 md:w-auto w-full">
          <div id="${area.strArea}"
            class="card area-card rounded-md p-3 overflow-hidden text-white text-center w-11/12 h-96 md:size-36 lg:size-48 xl:size-60 2xl:size-72 relative"
          >
            <i class="fa-solid fa-house-laptop fa-4x "></i>
            <h3 class="text-2xl mt-1">${area.strArea}</h3>
          </div>
        </div>
        `;
    newCard.innerHTML = cardContent;
    cardsContainer.appendChild(newCard);
  }
}
export function createIngredient(ingredientArray) {
  for (let ingredient of ingredientArray) {
    let newCard = document.createElement("div");
    let cardContent = `
  <div class="card-box p-3 md:w-auto w-full">
<div id="${ingredient.strIngredient}"
class="card ingredient-card rounded-md p-3 overflow-hidden text-white text-center w-11/12 h-96 md:size-36 lg:size-48 xl:size-60 2xl:size-72 relative"
>
<i class="fa-solid fa-drumstick-bite fa-4x "></i>
<h3 class="text-2xl mt-1">${ingredient.strIngredient}</h3>
<p>${ingredient.strDescription}</p>
</div>
</div>
`;
    newCard.innerHTML = cardContent;
    cardsContainer.appendChild(newCard);
  }
}

export function mealDetails(meal) {
  console.log("hello");
  console.log(mealScreen);
  mealScreen.css("display", "flex");
  mealImg.attr("src", meal.strMealThumb);
  mealName.text(meal.strMeal);
  mealInstructions.text(meal.strInstructions);
  mealArea.text(meal.strArea);
  mealCategory.text(meal.strCategory);
  SourceLink.attr("href", meal.strSource);
  YoutubeLink.attr("href", meal.strYoutube);

  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    let measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      let span = $("<span></span>")
        .addClass("inline-block m-1  bg-teal-100 text-teal-800 rounded-md p-2")
        .text(`${measure} ${ingredient}`);
      recipesDiv.append(span);
    }
  }

  let tags = meal.strTags.split(",");

  tags.forEach((tag) => {
    let span = $("<span></span>")
      .addClass("inline-block m-1  bg-red-100 text-red-800 rounded-md p-2")
      .text(tag);
    tagsDiv.append(span);
  });
}
