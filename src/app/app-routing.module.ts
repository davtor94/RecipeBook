import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipieComponent } from './recipie/recipie.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipie/recipe-start/recipe-start.component';
import { RecipieDetailComponent } from './recipie/recipie-detail/recipie-detail.component';
import { RecipeEditComponent } from './recipie/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    {path : '', redirectTo: '/recipes', pathMatch: 'full'},
    {path : 'recipes', component: RecipieComponent, children: [
        {path: '',  component: RecipeStartComponent},
        {path: 'new',component: RecipeEditComponent},
        {path: ':id',component: RecipieDetailComponent },
        {path: ':id/edit',component: RecipeEditComponent}
    ]},
    {path : 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}