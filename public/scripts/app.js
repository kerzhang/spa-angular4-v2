(function() {
  "use strict";

  angular
    .module("app", ["ngRoute"])
    .controller("RecipesController", function($scope, $location, dataService) {
      dataService.getRecipes(function(response) {
        // console.log(response.data);
        $scope.recipes = response.data;
      });

      dataService.getCategories(function(response) {
        // console.log(response.data);
        $scope.categories = response.data;
      });

      $scope.deleteRecipe = function(recipe, $index) {
        dataService.deleteRecipe(recipe._id);
        $scope.recipes.splice($index, 1);
      };

      $scope.directToPage = function(path) {
        $location.path(path);
      };
    })
    .controller("RecipeDetailController", function(
      $scope,
      $location,
      dataService
    ) {
      dataService.getCategories(function(response) {
        // console.log(response.data);
        $scope.categories = response.data;
      });

      const theRecipeId = $location.url().split("/").pop();
      if (theRecipeId === "add" || theRecipeId === undefined) {
        $scope.recipe = new Recipe();
        $scope.pageTitle = "Add New Recipe: ";
      } else {
        $scope.pageTitle = "Edit Recipe: ";
        dataService.getRecipeById(theRecipeId, function(response) {
          $scope.recipe = response.data;
          // $scope.defaultCategory = $scope.recipe.category;
        });
      }
      $scope.directToPage = function(path) {
        $location.path(path);
      };

      dataService.getFooditems(function(response) {
        // console.log(response.data);
        $scope.foodItems = response.data;
      });

      $scope.directToPage = function(path) {
        $location.path(path);
      };

      $scope.addNewRecipe = function(recipe) {
        dataService.postRecipe(recipe, function() {
          console.log("recipe added ...");
        });
        $location.path("/");
      };

      $scope.saveRecipe = function() {
        if ($scope.recipe._id) {
          dataService.updateRecipe($scope.recipe._id, $scope.recipe);
        } else {
          dataService.postRecipe($scope.recipe);
        }
        $location.path("/");
      };

      $scope.addNewIngredient = function() {
        let ing = new Ingredient();
        // let ing = {  foodItem: "", condition : "",  amount : 0};
        $scope.recipe.ingredients.push(ing);
      };

      $scope.addNewStep = function() {
        let s = { description: "" };
        // let ing = {  foodItem: "", condition : "",  amount : 0};
        $scope.recipe.steps.push(s);
      };

      $scope.deleteIngredient = function(index) {
        $scope.recipe.ingredients.splice(index, 1);
      };

      $scope.deleteStep = function(index) {
        $scope.recipe.steps.splice(index, 1);
      };
    })
    .service("dataService", function($http) {
      this.getRecipes = function(callback) {
        $http.get("/api/recipes").then(callback);
      };

      this.getCategories = function(callback) {
        $http.get("/api/categories").then(callback);
      };

      this.getFooditems = function(callback) {
        $http.get("/api/fooditems").then(callback);
      };

      this.getRecipesByCategory = function(categoryName, callback) {
        // console.log(categoryName);
        $http.get("/api/recipes?category=" + categoryName).then(callback);
      };

      this.getRecipeById = function(_id, callback) {
        $http.get("/api/recipes/" + _id).then(callback);
      };

      this.updateRecipe = function(_id, data) {
        $http.put("/api/recipes/" + _id, data);
      };

      this.postRecipe = function(recipe) {
        $http.post("/api/recipes/", recipe);
      };

      this.deleteRecipe = function(recipeId) {
        $http.delete("/api/recipes/" + recipeId);
        console.log("The " + recipeId + " recipe has been deleted!");
      };
    });
})();

class Recipe {
  constructor() {
    this.name = "";
    this.description = "";
    this.category = "";
    this.prepTime = 0;
    this.cookTime = 0;
    this.ingredients = [];
    this.steps = [];
  }
}

class Ingredient {
  constructor() {
    this.foodItem = "";
    this.condition = "";
    this.amount = 0;
  }
}
