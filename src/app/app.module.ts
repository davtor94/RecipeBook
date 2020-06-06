import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule}  from '@angular/common/Http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipieComponent } from './recipie/recipie.component';
import { RecipieListComponent } from './recipie/recipie-list/recipie-list.component';
import { RecipieItemComponent } from './recipie/recipie-list/recipie-item/recipie-item.component';
import { RecipieDetailComponent } from './recipie/recipie-detail/recipie-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipie/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipie/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipie/recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipieComponent,
    RecipieListComponent,
    RecipieItemComponent,
    RecipieDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
