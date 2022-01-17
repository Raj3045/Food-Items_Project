const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');




// event listeners ,add functionality to buttons
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch("app1.json?i=${searchInputTxt}")
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => 
                {
                html += `
                    <div class = "meal-item" data-id = "${meal.id}">
                        <div class = "meal-img">
                            <img src = "${meal.img}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h1>${meal.category}</h1> </br>
                            <h2>${meal.title}</h2></br>
                            <h3>${meal.desc}</h3>
                            </br>
                            <h4>${meal.price}</h4>
                        
                            <button type=submit class="recipe-btn">Add to Cart</button>
                        </div>
                    </div>
                `;
            });
          
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}
let cart1 = document.querySelector('.cart');
let add = document.getElementsByClassName('recipe-btn');
for(let but of add)
{
    but.onclick = e=>{
        let item = Number(cart1.getAttribute('data-count') || 0);
        cart1.setAttribute('data-count', item+1);
        cart1.classList.add('on');
    }
}

// get recipe of the meal
// function getMealRecipe(e){
//     e.preventDefault();
//     if(e.target.classList.contains('recipe-btn')){
//         let mealItem = e.target.parentElement.parentElement;
//         fetch("app1.json?i=${mealItem.dataset.id}")
//         .then(response => response.json())
//         .then(data => mealRecipeModal(data.meals));
//     }
// }

