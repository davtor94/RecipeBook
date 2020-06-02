import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class RecipeService{
    recipiesCHnaged = new Subject<Recipe[]>();

    recipes: Recipe[] = [
        new Recipe('test recipe', 
                    'test descriotion ',
                    'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
                    [
                        new Ingredient('salsa',10),
                        new Ingredient('Bread',15)
                    ]),
        new Recipe('Pizza', 
                    'pizza descrip ',
                    'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
                    [
                        new Ingredient('salsa',10),
                        new Ingredient('Bread',15),
                        new Ingredient('peperoni',5)
                    ])
                    
    ]

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
}