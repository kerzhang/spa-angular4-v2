import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { DataService } from './services/data/data.service';

const appRoutes: Routes = [
  {path: '', component:RecipesComponent},
  {path: 'edit/:id', component:RecipeDetailsComponent},
  {path: 'add', component:RecipeDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
