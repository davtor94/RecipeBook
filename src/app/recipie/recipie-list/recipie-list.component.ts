import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  constructor(private recipeService : RecipeService) { }
  subscription: Subscription;

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipies();
    this.subscription = this.recipeService.recipiesCHnaged.subscribe(
      (recipies : Recipe[]) =>{
        this.recipes = recipies;
      }
    )
  }
ngOnDestroy(){
this.subscription.unsubscribe();
}

}
