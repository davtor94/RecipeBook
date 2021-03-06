import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editMode : boolean = false ;
  recipeForm : FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService : RecipeService,
    private router: Router 
     ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=> {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
    
  }

  initForm(){
    let recipeName  = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImgPath = recipe.imagePath;
      if(recipe['ingredients']){
          for (const ing of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ing.name,Validators.required),
                'amount': new FormControl(ing.amount,[Validators.required, 
                  Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            )
            
          }
      }
    }
    this.recipeForm = new FormGroup({
        name: new FormControl(recipeName,Validators.required),
        imagePath : new FormControl(recipeImgPath,Validators.required),
        description : new FormControl(recipeDescription,Validators.required),
        ingredients : recipeIngredients 
      });

  }
  onSubmit(){
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    )
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, recipe)
    }else{
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onAddIngredient(){
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
  
  onDeleteIngredient(index: number){
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
