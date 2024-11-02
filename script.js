
document.getElementById('recipe-form').addEventListener('submit', addRecipe);

let recipes = [];

function addRecipe() {
   
    const name = document.getElementById('recipeName').value;
    const description = document.getElementById('recipeDesc').value;
    const imageInput = document.getElementById('recipeImage');

    if (!name || !description || !imageInput.files[0]) {
        displayError('Please fill in all fields.');
        return;
    }

    const recipe = {
        name,
        description,
        image: URL.createObjectURL(imageInput.files[0]),
    };

    recipes.push(recipe);
    updateRecipeList();
    clearForm();
}

function updateRecipeList() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    for(let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';
        recipeDiv.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div>
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
            </div>
            <button class="delete" onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(recipeDiv);
    };
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    updateRecipeList();
}

function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
}

function clearForm() {
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeDescription').value = '';
    document.getElementById('recipeImage').value = '';
}