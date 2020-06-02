import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css']
})
export class RecipieDetailComponent implements OnInit {
recipe : Recipe;
id: number;
  constructor(private shoppingListService: ShoppingListService,
              private recipeServie: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeServie.getRecipe(this.id);
    }
    );
  }

  addIngredientsToShoppingList(){
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
  
  editSelected(){
    this.router.navigate(['edit'],{relativeTo: this.route});
  }
  deleteRecipe(){
    this.recipeServie.deleteRecipe(this.id);
    this.router.navigate(['..'],{relativeTo: this.route});
  }
}
