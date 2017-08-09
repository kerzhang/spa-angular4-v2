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
    this.dataService.getCategories().subscribe(categories => {
      // console.log(categories);
      this.categories = categories;
    });

    this.dataService.getRecipes().subscribe(recipes => {
      // console.log(recipes);
      this.recipes = recipes;
    });
  }

  ngOnInit() {}

  getRecipesByCategory(selectedCategory) {
    this.dataService
      .getRecipesByCategoryName(selectedCategory)
      .subscribe(recipes => {
        this.recipes = recipes;
        this.recipesAreAvailable = this.recipes.length > 0;
      });
  }

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

  deleteRecipe() {
        this.dataService.deleteRecipe(this.recipeToBeDeleted._id);
        this.recipes.splice(this.indexOfRecipeToBeDeleted, 1);

        let alertModal = document.getElementById('myModal');
        alertModal.style.display = 'none';
      };
}
