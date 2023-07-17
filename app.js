// Get references to the necessary elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal-list");

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        searchMeals(searchTerm);
    }
});

// Function to search for meals using the API
function searchMeals(searchTerm) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.meals) {
                displayMeals(data.meals);
            } else {
                mealList.innerHTML = "<p>No meals found. Please try again.</p>";
            }
        })
        .catch((error) => {
            mealList.innerHTML = "<p>An error occurred. Please try again later.</p>";
            console.error(error);
        });
}

// Function to display the meals on the page
function displayMeals(meals) {
    mealList.innerHTML = "";
    meals.forEach((meal) => {
        const mealCard = document.createElement("div");
        mealCard.classList.add("col-md-4", "mb-4");
        mealCard.innerHTML = `
      <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
        </div>
      </div>
    `;
        mealList.appendChild(mealCard);
    });
}
