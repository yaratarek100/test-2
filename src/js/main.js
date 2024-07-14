import {
  createCards,
  createCategory,
  createArea,
  createIngredient,
  mealDetails
} from "./modules/creation.module.js";
import { inputValidation } from "./modules/reg.js";

export const cardsContainer = document.querySelector(".cards-container");

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("network response was not ok." + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("There was a problem with fetch the data.", error);
  }
}

async function display(fun, key, value, type) {
  cardsContainer.innerHTML = "";
  $(".loader-box").css("display", "flex");    
  let url = `https://www.themealdb.com/api/json/v1/1/${fun}.php?${key}=${value}`;
  let res = await getData(url);
  let array = res.meals;

  switch (type) {
    case "meal":
      createCards(array);
      break;
    case "area":
      createArea(array);
      break;
    case "ingredient":
      createIngredient(array);
      break;
    case "id":
      let meal =array[0] 
      mealDetails(meal);
      break;
    case "category":
      array = res.categories;
      createCategory(array);
  }
}

$(".side-hidden li").on("click", () => {
  $(".search-form").css("display", "none");
  $(".contact-form").css("display", "none");
  $(".meal-screen").css("display", "none");
});

$("#categories").on("click", async () => {
  await display("categories", "", "", "category");
  $(".loader-box").css("display", "none");    
  $(".category-card").on("click",async function () {
      let filterValue = $(this).attr("id");
      await display("filter", "c", filterValue, "meal");
      $(".loader-box").css("display", "none");    
    mealClick();
  });
});

$("#area").on("click", async () => {
  await display("list", "a", "list", "area");
  $(".loader-box").css("display", "none");    
  $(".area-card").on("click", async function () {
    let filterValue = $(this).attr("id");
    await display("filter", "a", filterValue, "meal");
    $(".loader-box").css("display", "none");    
    mealClick();
  });
});

$("#ingredients").on("click", async () => {
  await display("list", "i", "list", "ingredient");
  $(".loader-box").css("display", "none");    
  $(".ingredient-card").on("click",async function () {
    let filterValue = $(this).attr("id");
    await display("filter", "i", filterValue, "meal");
    $(".loader-box").css("display", "none");    
    mealClick();
  });
});

$("#by-name").on("keyup",async () => {
  let value = $("#by-name").val();
  await display("search", "s", value, "meal");
  $(".loader-box").css("display", "none");    
  mealClick();
});

$("#by-first").on("keyup" ,async() => {
  let value = $("#by-first").val();
  await display("search", "f", value, "meal");
  $(".loader-box").css("display", "none");    
  mealClick();
});

$("#search").on("click", () => {
  cardsContainer.innerHTML = "";
  $(".search-form").css("display", "block");
});

$("#contact").on("click", () => {
  cardsContainer.innerHTML = "";
  $(".contact-form").css("display", "flex");
});


$(".contact-form input").on("keyup", function() {
 inputValidation($(this).val() , $(this).attr("id"));
});

// meal by id
function mealClick(){
$(".meal-card").on("click", function() {
  let mealId =$(this).attr("id");
  display("lookup", "i", mealId, "id");
  $(".loader-box").css("display", "none");    
});}


// main function on loading
await display("search", "s", "", "meal");
$(".loader-box").css("display", "none");    
mealClick();



// -----------
$("#nav-b").on("click", function() {
  if ($(this).html() === '<i class="fa-solid fa-xmark fa-2x"></i>') {
    $(this).html('<i class="fa-solid fa-bars fa-2x"></i>');
    $(".side-box").css("left", "-16rem");
  } else {
    $(this).html('<i class="fa-solid fa-xmark fa-2x"></i>');
    $(".side-box").css("left", "0");
  }
});

