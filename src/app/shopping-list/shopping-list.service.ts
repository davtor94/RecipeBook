import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    ingedientsChanged = new Subject<Ingredient[]>();
    startedEditting = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('apple',4),
        new Ingredient('tomatoes',6)
        ];

    getIngredients(){
        return this.ingredients.slice();
     }

    addIngredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingedientsChanged.next(this.ingredients.slice());
      }
      addIngredients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingedientsChanged.next(this.ingredients.slice());
      }
      getIngredient(i : number){
        return this.ingredients[i];
      }
      updateIngredient(i:number,newIngredient: Ingredient){
        this.ingredients[i] = newIngredient;
        this.ingedientsChanged.next(this.ingredients.slice());
      }
      deleteIngredient(i: number){
        this.ingredients.splice(i,1);
        this.ingedientsChanged.next(this.ingredients.slice());
      }
}