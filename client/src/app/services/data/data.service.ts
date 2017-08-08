import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  constructor(public http: Http) {}

  getCategories() {
    return this.http.get('api/categories').map(res => res.json());
  };

  getRecipes() {
    return this.http.get('api/recipes').map(res => res.json());
  };

  getRecipesByCategoryName(categoryName) {
    return this.http
      .get('api/recipes?category=' + categoryName)
      .map(res => res.json());
  };

  getFooditems = function() {
    return this.http.get('/api/fooditems').map(res => res.json());
  };

  getRecipeById = function(_id) {
    return this.http.get('/api/recipes/' + _id).map(res => res.json());
  };

  updateRecipe = function(_id, data) {
    this.http.put('/api/recipes/' + _id, data);
  };

  postRecipe = function(recipe) {
    this.http.post('/api/recipes/', recipe);
  };

  deleteRecipe = function(recipeId) {
    this.http.delete('/api/recipes/' + recipeId);
    console.log('The ' + recipeId + ' recipe has been deleted!');
  };
}
