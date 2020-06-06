import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
constructor(private datService : DataStorageService, private recipeService : RecipeService){}
resolve(route: ActivatedRouteSnapshot, state : RouterStateSnapshot){
    const recipies = this.recipeService.getRecipies();
    if(recipies.length === 0){
        return this.datService.fecthRecipes();
    }else{
        return recipies;
    }
}
}