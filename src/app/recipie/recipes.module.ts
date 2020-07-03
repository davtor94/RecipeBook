import { NgModule } from "@angular/core";
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipieComponent } from './recipie.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieItemComponent } from './recipie-list/recipie-item/recipie-item.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        RecipeStartComponent,
        RecipeEditComponent,
        RecipieComponent,
        RecipieListComponent,
        RecipieItemComponent,
        RecipieDetailComponent,
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule{}