import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';


export class RecipeService{
    recipiesCHnaged = new Subject<Recipe[]>();
    private recipes : Recipe[] = [];

    getRecipe(id: number){
        return this.recipes[id];
    }

    getRecipies(){
        return this.recipes.slice();
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipiesCHnaged.next(this.recipes.slice());
    }

    updateRecipe(index : number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipiesCHnaged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipiesCHnaged.next(this.recipes.slice());
    }

    setRecipes(recipies : Recipe[]){
        this.recipes = recipies;
        this.recipiesCHnaged.next(this.recipes.slice());
    }
}