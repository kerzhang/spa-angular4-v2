import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  constructor(public http: Http) {}
  //Get all categories through the get api.
  getCategories() {
    return this.http.get('api/categories').map(res => res.json());
  }
  //Get all recipes through the get api.
  getRecipes() {
    return this.http.get('api/recipes').map(res => res.json());
  }
  //Get all the recipes belong to a specific category.
  getRecipesByCategoryName(categoryName) {
    return this.http
      .get('api/recipes?category=' + categoryName)
      .map(res => res.json());
  }
  //Get all food items
  getFooditems = function() {
    return this.http.get('/api/fooditems').map(res => res.json());
  };
  //Get a recipe by ID
  getRecipeById = function(_id) {
    return this.http.get('/api/recipes/' + _id).map(res => res.json());
  };
 //Update a recipe by id and also pass in the modified data.
  updateRecipe(_id, data) {
    return this.http.put('/api/recipes/' + _id, data).subscribe(res => {
      console.log('recipe updated:' + res);
    });
  }
  //Add new recipe
  postRecipe(recipe) {
    return this.http.post('/api/recipes/', recipe).subscribe(res => {
      console.log('recipe posted:' + res);
    });
  }
  //Delete existing recipe.
  deleteRecipe(recipeId) {
    this.http.delete('/api/recipes/' + recipeId).subscribe(res => {
      console.log('The ' + recipeId + ' recipe has been deleted!' + res);
    });
  }
}
