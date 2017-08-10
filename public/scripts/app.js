(function() {
  'use strict';

  //Recipe object will be used when creating new recipe.
  class Recipe {
    constructor() {
      this.name = '';
      this.description = '';
      this.category = '';
      this.prepTime = 0;
      this.cookTime = 0;
      this.ingredients = [];
      this.steps = [];
    }
  }

  //Ingredient object
  class Ingredient {
    constructor() {
      this.foodItem = '';
      this.condition = '';
      this.amount = 0;
    }
  }
  angular
    .module('app', ['ngRoute'])
    .controller('RecipesController', function($scope, $location, dataService) {
      //First get all the recipes to be listed.
      dataService.getRecipes(function(response) {
        // console.log(response.data);
        $scope.recipes = response.data;
      });
      //get all the categoies which is listed as the options of the Category select menu.
      dataService.getCategories(function(response) {
        // console.log(response.data);
        $scope.categories = response.data;
      });

      //function for deleting a recip, it calls the service function which perform the real db deleting operation.
      $scope.deleteRecipe = function() {
        dataService.deleteRecipe($scope.recipeToBeDeleted._id);
        $scope.recipes.splice($scope.indexOfRecipeToBeDeleted, 1);

        let alertModal = document.getElementById('myModal');
        alertModal.style.display = 'none';
      };

      //function for redirect urls.
      $scope.directToPage = function(path) {
        $location.path(path);
      };

      //For confirm dialog popups while deleting a recipe.
      $scope.openAlertModal = function(recipe, $index){
        $scope.recipeToBeDeleted = recipe;
        $scope.indexOfRecipeToBeDeleted = $index;

        let alertModal = document.getElementById('myModal');
        alertModal.style.display = 'block';
      };
      //Close the confirm dialog.
      $scope.closeAlertModal = function(){
        var alertModal = document.getElementById('myModal');
        alertModal.style.display = 'none';
      };

    })
    .controller('RecipeDetailController', function(
      $scope,
      $location,
      dataService
    ) {
      //Get all the categories.
      dataService.getCategories(function(response) {
      //get all the categoies which is listed as the options of the Category select menu.
        $scope.categories = response.data;
      });

      //Get the recipe id of current recipe being editing
      //There isn't id for new creating recipe.
      const theRecipeId = $location.url().split('/').pop();
      //If the pasing result is not a recipe id, we will know we are 'Adding' a new recipe.
      if (theRecipeId === 'add' || theRecipeId === undefined) {
        $scope.recipe = new Recipe();
        $scope.pageTitle = 'Add New Recipe: ';
      } else {
        //Else we are in editing senario, then fetch the recipe by id.
        $scope.pageTitle = 'Editing Recipe: ';
        dataService.getRecipeById(theRecipeId, function(response) {
          $scope.recipe = response.data;
        });
      };

      //function for redirect urls.
      $scope.directToPage = function(path) {
        $location.path(path);
      };
      //Fetch all food items which be listed as options of food item menu.
      dataService.getFooditems(function(response) {
        $scope.foodItems = response.data;
      });

      //Perform either post or put action base on current senario
      //Call post or update service to perform the real db opreation.
      $scope.saveRecipe = function() {
        if ($scope.recipe._id) {
          dataService.updateRecipe($scope.recipe._id, $scope.recipe);
        } else {
          dataService.postRecipe($scope.recipe);
        }
        $location.path('/');
      };
      //Add new ingredient.
      $scope.addNewIngredient = function() {
        let ing = new Ingredient();
        // let ing = {  foodItem: "", condition : "",  amount : 0};
        $scope.recipe.ingredients.push(ing);
      };
      //Add new step.
      $scope.addNewStep = function() {
        let s = { description: '' };
        // let ing = {  foodItem: "", condition : "",  amount : 0};
        $scope.recipe.steps.push(s);
      };
      //Delete existing ingredient.
      $scope.deleteIngredient = function(index) {
        $scope.recipe.ingredients.splice(index, 1);
      };
      //Delete existing step.
      $scope.deleteStep = function(index) {
        $scope.recipe.steps.splice(index, 1);
      };
    })
    //The data operation service of the application.
    .service('dataService', function($http) {
      //Get all recipes through the get api.
      this.getRecipes = function(callback) {
        $http.get('/api/recipes').then(callback);
      };
      //Get all categories.
      this.getCategories = function(callback) {
        $http.get('/api/categories').then(callback);
      };
      //Get all food items.
      this.getFooditems = function(callback) {
        $http.get('/api/fooditems').then(callback);
      };
      //Get all the recipes belong to a specific category.
      this.getRecipesByCategory = function(categoryName, callback) {
        // console.log(categoryName);
        $http.get('/api/recipes?category=' + categoryName).then(callback);
      };
      //Get a recipe by ID
      this.getRecipeById = function(_id, callback) {
        $http.get('/api/recipes/' + _id).then(callback);
      };
      //Update a recipe by id and also pass in the modified data.
      this.updateRecipe = function(_id, data) {
        $http.put('/api/recipes/' + _id, data);
      };
      //Post a new recipe
      this.postRecipe = function(recipe) {
        $http.post('/api/recipes/', recipe);
      };
      //Delele a recipe by id.
      this.deleteRecipe = function(recipeId) {
        $http.delete('/api/recipes/' + recipeId);
        console.log('The ' + recipeId + ' recipe has been deleted!');
      };
    });
})();
