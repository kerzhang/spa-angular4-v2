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

  constructor(
    public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['id'];
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
      this.isAddingModel = false;
      this.dataService
        .getRecipeById(this.recipeId)
        .subscribe(recipe => {
          this.recipe = recipe;
          // console.log(recipe);
        });
    };

    this.dataService.getCategories().subscribe(categories => {
      // console.log(categories);
      this.categories = categories;
    });

    this.dataService.getFooditems().subscribe(foodItems => {
      // console.log(foodItems);
      this.foodItems = foodItems;
    });
  };

  saveRecipe() {
    if (this.isAddingModel) {
      this.dataService.postRecipe(this.recipe);
    } else {
      this.dataService.updateRecipe(this.recipeId, this.recipe);
    }
    this.router.navigate(['']);
  };

  deleteIngredient(index) {
    this.recipe.ingredients.splice(index, 1);
  };

  deleteStep(index) {
    this.recipe.steps.splice(index, 1);
  };

  addNewIngredient() {
    let ing: Ingredient = {
      foodItem: '',
      condition: '',
      amount: ''
    };
    // let ing = {  foodItem: "", condition : "",  amount : 0};
    this.recipe.ingredients.push(ing);
  };

  addNewStep() {
    let s = { description: '' };
    // let ing = {  foodItem: "", condition : "",  amount : 0};
    this.recipe.steps.push(s);
  };
}
