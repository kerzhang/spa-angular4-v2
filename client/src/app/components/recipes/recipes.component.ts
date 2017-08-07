import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipes: any[];
  albums: any[];

  constructor(public dataService: DataService) {
    this.dataService.getAlbums().subscribe(albums =>{
      console.log(albums);
    })
  }
}
