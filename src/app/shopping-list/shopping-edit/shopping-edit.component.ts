import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slForm : NgForm;
  subscription : Subscription;
  editMode = false;
  editingIndex : number;
  editingItem : Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditting.subscribe(
      (index:number)=> {
        this.editingIndex = index;
        this.editMode = true;
        this.editingItem = this.shoppingListService.getIngredient(this.editingIndex);
        this.slForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        })
      }
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  addIngredient(form: NgForm){    
    const values = form.value; 
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editingIndex,new Ingredient(values.name,values.amount));
    }else{
      this.shoppingListService.addIngredient(new Ingredient(values.name,values.amount));
    }
    this.onReset();
  }
  onReset(){
    this.editMode = false;
    this.slForm.reset();
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editingIndex);
   this.onReset();
  }
}
