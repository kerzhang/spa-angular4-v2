import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: string = '';
  categories: any[];
  footItems: any[];
  recipe: any;

  constructor(
    public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.recipeId = params.id;
    });

    this.dataService.getRecipeById(this.recipeId).subscribe(recipe => {
      this.recipe = recipe;
    })

    this.dataService.getCategories().subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    });

    this.dataService.getFooditems().subscribe(footItems => {
      console.log(footItems);
      this.footItems = footItems;
    });
  }

  ngOnInit() {}
}
