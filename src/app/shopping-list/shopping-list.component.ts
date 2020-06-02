import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
ingredients: Ingredient[] = [];
private ingredientChangeSubs : Subscription;
  constructor(private shoppingListService:ShoppingListService) { }

  onEditItem(i : number){
    this.shoppingListService.startedEditting.next(i);
  }
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
   this.ingredientChangeSubs = this.shoppingListService.ingedientsChanged.subscribe(
      (ingredients: Ingredient[])=> {this.ingredients = ingredients;}
    )
  }

  ngOnDestroy(): void {
    this.ingredientChangeSubs.unsubscribe();
  }

}
