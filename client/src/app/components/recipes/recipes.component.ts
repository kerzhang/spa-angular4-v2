import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipes: any[];
  categories: any[];
  selectedCategory: any;
  recipesAreAvailable: boolean = true;
  recipeToBeDeleted: any = null;
  indexOfRecipeToBeDeleted: any = -1;

  constructor(public dataService: DataService) {
    //Get all categories
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    //Get all recipes.
    this.dataService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  ngOnInit() {}

  //Get all the recipes belong to a specific categories.
  getRecipesByCategory(selectedCategory) {
    this.dataService
      .getRecipesByCategoryName(selectedCategory)
      .subscribe(recipes => {
        this.recipes = recipes;
        this.recipesAreAvailable = this.recipes.length > 0;
      });
  }

  //Open the confirm dialog for deleting a recipe.
  openAlertModal = function(recipe, $index) {
    this.recipeToBeDeleted = recipe;
    this.indexOfRecipeToBeDeleted = $index;

    let alertModal = document.getElementById('myModal');
    alertModal.style.display = 'block';
  };

  closeAlertModal = function() {
    let alertModal = document.getElementById('myModal');
    alertModal.style.display = 'none';
  };

  //Delete an existing item
  deleteRecipe() {
    this.dataService.deleteRecipe(this.recipeToBeDeleted._id);
    this.recipes.splice(this.indexOfRecipeToBeDeleted, 1);
    //close the deleting confirm dialog
    let alertModal = document.getElementById('myModal');
    alertModal.style.display = 'none';
  }
}
