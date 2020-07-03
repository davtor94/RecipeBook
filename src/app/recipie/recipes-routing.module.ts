import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth/auth-guard';
import { RecipieComponent } from './recipie.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';
const RecipesRoutes : Routes = [
    {path : '', 
    component: RecipieComponent, 
    canActivate : [AuthGuard],
    children: [
        {path: '',  component: RecipeStartComponent},
        {path: 'new',component: RecipeEditComponent},
        {path: ':id',component: RecipieDetailComponent,resolve: [RecipeResolverService]},
        {path: ':id/edit',component: RecipeEditComponent,resolve: [RecipeResolverService]}
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(RecipesRoutes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule{}