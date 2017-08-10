import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../../models/Recipe';
import { Ingredient } from '../../models/Ingredient';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: string;
  categories: any[];
  foodItems: any[];
  isAddingModel: boolean = false;
  recipe: Recipe;

  //Dependency injection of servies to be used
  constructor(
    public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //Get the recipe id of current recipe being editing
    //There isn't id for new creating recipe.
    this.recipeId = this.route.snapshot.params['id'];

    //If the pasing result is not a recipe id, we will know we are 'Adding' a new recipe.
    if (this.recipeId === undefined) {
      this.isAddingModel = true;
      this.recipe = {
        name: '',
        description: '',
        category: '',
        prepTime: 0,
        cookTime: 0,
        ingredients: [],
        steps: []
      };
    } else {
      //Else we are in editing senario, then fetch the recipe by id.
      this.isAddingModel = false;
      this.dataService
        .getRecipeById(this.recipeId)
        .subscribe(recipe => {
          this.recipe = recipe;
        });
    };

    //Get all categories.
    this.dataService.getCategories().subscribe(categories => {
      // console.log(categories);
      this.categories = categories;
    });
    //Get all the food items.
    this.dataService.getFooditems().subscribe(foodItems => {
      // console.log(foodItems);
      this.foodItems = foodItems;
    });
  };
  //Perform either post or put action base on current senario
  //Call post or update service to perform the real db opreation.
  saveRecipe() {
    if (this.isAddingModel) {
      this.dataService.postRecipe(this.recipe);
    } else {
      this.dataService.updateRecipe(this.recipeId, this.recipe);
    }
    this.router.navigate(['']);
  };

  //Delete an ingredient.
  deleteIngredient(index) {
    this.recipe.ingredients.splice(index, 1);
  };

  //Delete an existing steps.
  deleteStep(index) {
    this.recipe.steps.splice(index, 1);
  };
  //Add new ingredient
  addNewIngredient() {
    let ing: Ingredient = {
      foodItem: '',
      condition: '',
      amount: ''
    };
    this.recipe.ingredients.push(ing);
  };
  //Add new steps.
  addNewStep() {
    let s = { description: '' };
    this.recipe.steps.push(s);
  };
}
