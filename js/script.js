// nav toggle

$("#open").click(function() {
  if($("#navbar").css("left") == "0px") {
    $("#navbar").css({left: "-250px"})
    $("#open").removeClass("fa-x")
    $("#navbar .inner ul li").addClass("closed").removeClass("opened")
  } else {
    $("#navbar").css({left: "0"})
    $("#open").addClass("fa-x")
    $("#navbar .inner ul li").addClass("opened").removeClass("closed")
  }
  navAnimate()
})

function navAnimate() {
  if($("#navbar .inner ul li").hasClass("opened")) {
    $("#navbar .inner ul li.item1").animate({
      opacity: "1",
      paddingTop: "25px"
    },1100),$("#navbar .inner ul li.item2").animate({
      opacity: "1",
      paddingTop: "25px"
    },1200),$("#navbar .inner ul li.item3").animate({
      opacity: "1",
      paddingTop: "25px"
    },1300),$("#navbar .inner ul li.item4").animate({
      opacity: "1",
      paddingTop: "25px"
    },1400),$("#navbar .inner ul li.item5").animate({
      opacity: "1",
      paddingTop: "25px"
    },1500)
  } else if ($("#navbar .inner ul li").hasClass("closed")) {
    $("#navbar .inner ul li").animate({
      opacity: "0",
      paddingTop: "250px"
    })
  }
}

// Loading fadeout
$(".loading").fadeOut(1000)

// Start Home 


// get Cat 

async function getCategories() {
  let meals = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
   meals = await meals.json()
   $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  displayCategories(meals)
  $("html, body").animate({
    scrollTop: 0
  },200)
}



function displayCategories(arr) {
  let a = ``;
  for(let i = 0; i < arr.categories.length; i++) {
    a += `
    <div class="col-md-3 position-relative rounded-2 " onclick="filterByCategory('${arr.categories[i].strCategory}')">
          <div class="card position-relative">
            <div class="image">
            <img src="${arr.categories[i].strCategoryThumb}" alt="" class="w-100" loading="lazy">
          </div>
          <div class="content position-absolute text-center" >
            <h2 class="">${arr.categories[i].strCategory}</h2>
            <p class="px-2">${arr.categories[i].strCategoryDescription}</p>
          </div>
          </div>
        </div>`
  }
  document.getElementById("box").innerHTML = a
  
}


async function filterByCategory(cat) {
  let catMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  catMeals = await catMeals.json();
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  displayCatMeals(catMeals)
  $("html, body").animate({
    scrollTop: 0
  },200)
}

function displayCatMeals(arr) {
  let a = ``;
  for(let i = 0; i < arr.meals.length; i++) {
    a += `
    <div class="col-md-3 position-relative rounded-2 overflow-hidden" onclick="searchByName('${arr.meals[i].strMeal}')">
          <div class="card position-relative ">
            <div class="image">
            <img src="${arr.meals[i].strMealThumb}" alt="" class="w-100" loading="lazy">
          </div>
          <div class="content position-absolute text-center d-flex justify-content-center align-items-center" >
            <h2 class="">${arr.meals[i].strMeal}</h2>
          </div>
          </div>
        </div>`
  }
  document.getElementById("box").innerHTML = a
}


// Start Search 
$(".item1").click(function() {
  $("#search").removeClass("d-none")
  document.getElementById("box").innerHTML = ""
})
$("#navbar .inner ul li:not(.item1)").click(function() {
  $("#search").addClass("d-none")
})
async function filterByLetter(char) {
  let catMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
  catMeals = await catMeals.json();
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  displayMealsByFirstLetter(catMeals)
  $("html, body").animate({
    scrollTop: 0
  },200)
}

function displayMealsByFirstLetter(arr) {
  let a = ``;
  for(let i = 0; i < arr.meals.length; i++) {
    a += `
    <div class="col-md-3 position-relative rounded-2 overflow-hidden" onclick="searchByName('${arr.meals[i].strMeal}')">
          <div class="card position-relative ">
            <div class="image">
            <img src="${arr.meals[i].strMealThumb}" alt="" class="w-100" loading="lazy">
          </div>
          <div class="content position-absolute text-center d-flex justify-content-center align-items-center" >
            <h2 class="">${arr.meals[i].strMeal}</h2>
          </div>
          </div>
        </div>`
  }
  document.getElementById("box").innerHTML = a
}
// Home page
async function filterByName(name) {
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  meals = await meals.json();
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  displayMealsByName(meals)
  $("html, body").animate({
    scrollTop: 0
  },200)
}
filterByName("")
function displayMealsByName(arr) {
  let a = ``;
  for(let i = 0; i < arr.meals.length; i++) {
    a += `
    <div class="col-md-3 position-relative rounded-2 overflow-hidden" onclick="searchByName('${arr.meals[i].strMeal}')">
          <div class="card position-relative ">
            <div class="image">
            <img src="${arr.meals[i].strMealThumb}" alt="" class="w-100" loading="lazy">
          </div>
          <div class="content position-absolute text-center d-flex justify-content-center align-items-center" >
            <h2 class="">${arr.meals[i].strMeal}</h2>
          </div>
          </div>
        </div>`
  }
  document.getElementById("box").innerHTML = a
  
}


async function searchByName(name) {
  let mealName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  mealName = await mealName.json();
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  displayMealInstructions(mealName.meals[0])
  $("html, body").animate({
    scrollTop: 0
  },200)
}

function displayMealInstructions(arr) {
  let recipes = ``;
  for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]) {
            recipes += `<li class="my-1 mx-1 p-1 alert-success rounded">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
        }
    }
    
    let tags = arr.strTags?.split(",");
    let tag = ""
    for(let i = 0; i < tags?.length; i++) {
      tag += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
    }
    
    
    let a = ``;
  
    a += `
    <div class="col-md-4 position-relative rounded-2 " id="meal">
          <div class="card position-relative">
            <div class="image">
            <img src="${arr.strMealThumb}" alt="" class="w-100" loading="lazy">
            <h2 class="text-white">${arr.strMeal}</h2>
          </div>
          </div>
        </div>
        <div class="col-md-8" id="instructions">
        <h2 class="text-white">Instructions</h2>
        <p class="text-white">${arr.strInstructions}</p>
        <p class="text-white"><span class="fw-bold">Area:</span>${arr.strArea}</p>
        <p class="text-white"><span class="fw-bold">Area:</span>${arr.strCategory}</p>
        <h2 class="text-white">recipes</h2>
        <ul id="recipes" class="text-white p-0">
        </ul>

        <h3 class="my-2 mx-1 p-1 text-white">Tags</h3>
        <ul class="d-flex p-0" id="tags">
        </ul>
        <a class="btn btn-success text-white me-2" target="_blank" href="${arr.strSource}">Source</a>
        <a class="btn btn-danger text-white" target="_blank" href="${arr.strYoutube}">Youtube</a>
        </div>
        `
    document.getElementById("box").innerHTML = a
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tag
}
// Start Area

async function getAreas() {
  let areas = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  areas = await areas.json();
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  displayAreas(areas.meals)
  $("html, body").animate({
    scrollTop: 0
  },200)
}

function displayAreas(arr) {
  let a =``;
  for(let i = 0; i < arr.length; i++) {
    a += `
    <div onclick="(filterByArea('${arr[i].strArea}'))" class="post col-md-3 text-center">
    <div class="innerArea p-2 rounded-2 shadow">
      <i class="fa-solid fa-city fa-3x text-danger mb-2 "></i>
      <h2 class="text-white">${arr[i].strArea}</h2>
    </div>
            </div>
    `
  }
  document.getElementById("box").innerHTML = a
}


async function filterByArea(ar) {
  let area = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${ar}`)
  area = await area.json();
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  displayAreaMeals(area);
  $("html, body").animate({
    scrollTop: 0
  },200)
}

function displayAreaMeals(arr) {
  let a = ``;
  for(let i = 0; i < arr.meals.length; i++) {
    a += `
    <div class="col-md-3 position-relative rounded-2 overflow-hidden" onclick="searchByName('${arr.meals[i].strMeal}')">
          <div class="card position-relative ">
            <div class="image">
            <img src="${arr.meals[i].strMealThumb}" alt="" class="w-100" loading="lazy">
          </div>
          <div class="content position-absolute text-center d-flex justify-content-center align-items-center" >
            <h2 class="">${arr.meals[i].strMeal}</h2>
          </div>
          </div>
        </div>`
  }
  document.getElementById("box").innerHTML = a
}


// Start Ingredients

async function getIngredients() {
  let ing = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  ing = await ing.json();
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  displayIngredients(ing.meals);
  $("html, body").animate({
    scrollTop: 0
  },200)
}


function displayIngredients(arr) {
  let a =``;
  
  for(let i = 0; i < arr.length && i < 20; i++) {
    a += `
    <div onclick="(filterByMainIngredient('${arr[i].strIngredient}'))" class="post col-md-3 text-center">
    <div class="innerArea p-2 rounded-2 shadow">
      <i class="fa-solid fa-bowl-food fa-3x text-primary"></i>
      <h2 class="text-white">${arr[i].strIngredient}</h2>
      <p class="text-white">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
            </div>
    `
  }
  
  document.getElementById("box").innerHTML = a
}


async function filterByMainIngredient(main) {
  let mainIng = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${main}`);
  mainIng = await mainIng.json();
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  filterByIngredient(mainIng.meals)
  $("html, body").animate({
    scrollTop: 0
  },200)
}


function filterByIngredient(arr) {
   let a = ``;
   
  for(let i = 0; i < arr.length; i++) {
    a += `
    <div class="col-md-3 position-relative rounded-2 overflow-hidden" onclick="searchByName('${arr[i].strMeal}')">
          <div class="card position-relative ">
            <div class="image">
            <img src="${arr[i].strMealThumb}" alt="" class="w-100" loading="lazy">
          </div>
          <div class="content position-absolute text-center d-flex justify-content-center align-items-center" >
            <h2 class="">${arr[i].strMeal}</h2>
          </div>
          </div>
        </div>`
  }
  document.getElementById("box").innerHTML = a
}


// Start Contact

function displayContact() {
  document.getElementById("box").innerHTML = ""
  $(".loading").fadeIn(10)
   $(".loading").fadeOut(200)
  $(".contact").fadeIn(500)
}

let userVal = /^[a-zA-Z ]+$/;

$(".contact .form input[name='uName']").keyup(function() {
  if(userVal.test($(".contact .form input[name='uName']").val())) {
    $(".contact .form input[name='uName']").next().css({visibility: "hidden"})
    $(".contact .form input[name='uName']").css({
      borderBottom: "1px solid green"
    })
    $(".contact .form input[name='uName']").removeClass("is-invalid")
    $(".contact .form input[name='uName']").addClass("is-valid")
  } else {
    $(".contact .form input[name='uName']").next().css({visibility: "visible"})
    $(".contact .form input[name='uName']").css({
      borderBottom: "1px solid red"
    })
    $(".contact .form input[name='uName']").addClass("is-invalid")
    $(".contact .form input[name='uName']").addClass("is-invalid")

  }
})


let emailVal = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;

$(".contact .form input[name='email']").keyup(function() {
  if(emailVal.test($(".contact .form input[name='email']").val())) {
    $(".contact .form input[name='email']").next().css({visibility: "hidden"})
    $(".contact .form input[name='email']").css({
      borderBottom: "1px solid green"
    })
    $(".contact .form input[name='email']").removeClass("is-invalid")
    $(".contact .form input[name='email']").addClass("is-valid")
  } else {
    $(".contact .form input[name='email']").next().css({visibility: "visible"})
    $(".contact .form input[name='email']").addClass("is-invalid")
    $(".contact .form input[name='email']").addClass("is-invalid")
  }
})

let numberVal = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

$(".contact .form input[name='number']").keyup(function() {
  if(numberVal.test($(".contact .form input[name='number']").val())) {
    $(".contact .form input[name='number']").next().css({visibility: "hidden"})
    $(".contact .form input[name='number']").css({
      borderBottom: "1px solid green"
    })
    $(".contact .form input[name='number']").removeClass("is-invalid")
    $(".contact .form input[name='number']").addClass("is-valid")
  } else {
    $(".contact .form input[name='number']").next().css({visibility: "visible"})
    $(".contact .form input[name='number']").addClass("is-invalid")
    $(".contact .form input[name='number']").addClass("is-invalid")
  }
})


let ageVal = /^[1-9][0-9]?$|^100$/;


$(".contact .form input[name='age']").keyup(function() {
  if(ageVal.test($(".contact .form input[name='age']").val())) {
    $(".contact .form input[name='age']").next().css({visibility: "hidden"})
    $(".contact .form input[name='age']").css({
      borderBottom: "1px solid green"
    })
    $(".contact .form input[name='age']").removeClass("is-invalid")
    $(".contact .form input[name='age']").addClass("is-valid")
  } else {
    $(".contact .form input[name='age']").next().css({visibility: "visible"})
    $(".contact .form input[name='age']").addClass("is-invalid")
    $(".contact .form input[name='age']").addClass("is-invalid")
  }
})


let passwordVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


$(".contact .form input[name='password']").keyup(function() {
  if(passwordVal.test($(".contact .form input[name='password']").val())) {
    $(".contact .form input[name='password']").next().css({visibility: "hidden"})
    $(".contact .form input[name='password']").css({
      borderBottom: "1px solid green"
    })
    $(".contact .form input[name='password']").removeClass("is-invalid")
    $(".contact .form input[name='password']").addClass("is-valid")
  } else {
    $(".contact .form input[name='password']").next().css({visibility: "visible"})
    $(".contact .form input[name='password']").addClass("is-invalid")
    $(".contact .form input[name='password']").addClass("is-invalid")
  }
})



$(".contact .form input[name='rePassword']").keyup(function() {
  if($(".contact .form input[name='rePassword']").val() == $(".contact .form input[name='rePassword']").val()) {
    $(".contact .form input[name='rePassword']").next().css({visibility: "hidden"})
    $(".contact .form input[name='rePassword']").css({
      borderBottom: "1px solid green"
    })
    $(".contact .form input[name='rePassword']").removeClass("is-invalid")
    $(".contact .form input[name='rePassword']").addClass("is-valid")
  } else {
    $(".contact .form input[name='rePassword']").next().css({visibility: "visible"})
    $(".contact .form input[name='rePassword']").addClass("is-invalid")
    $(".contact .form input[name='rePassword']").addClass("is-invalid")
  }
})


