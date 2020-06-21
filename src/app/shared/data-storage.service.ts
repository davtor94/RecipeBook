import { Injectable } from '@angular/core';
import {  HttpClient, HttpParams } from '@angular/common/Http';
import { RecipeService } from '../recipie/recipe.service';
import { Recipe } from '../recipie/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/auth.service';
@Injectable({providedIn: 'root'})
export class DataStorageService{

constructor(
    private http : HttpClient, 
    private recipesService : RecipeService, 
    private authService : AuthService
    ){}

storeRecipes(){
    const recipies = this.recipesService.getRecipies();
    this.http.put('https://my-project-732c0.firebaseio.com/recipies.json',
    recipies
    ).subscribe(response=>{
        console.log(response)
    })
}
fecthRecipes(){
    // return this.authService.user.pipe(
    //     take(1),
    //     exhaustMap(user =>{
    //         return this.http.get<Recipe[]>(
    //             'https://my-project-732c0.firebaseio.com/recipies.json',
    //             {params: new HttpParams().set('auth',user.token)}
    //         );
    //     }),
    //     map(recipies =>{
    //         return recipies.map(recipe =>{
    //             return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
    //         })
    //     }),
    //     tap(recipies =>{
    //         this.recipesService.setRecipes(recipies);
    //     }
    //     ));
    
    return this.http.get<Recipe[]>('https://my-project-732c0.firebaseio.com/recipies.json')
    .pipe(map(recipies =>{
        return recipies.map(recipe =>{
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
    }),
    tap(recipies =>{
        this.recipesService.setRecipes(recipies);
    }
    ));
}
}