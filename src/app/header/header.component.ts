import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorage:DataStorageService, private authService : AuthService) { }
  collapsed = true;
  isAuthenticated = false;
  userSub : Subscription;
  saveData(){
    this.dataStorage.storeRecipes();
  }
  fetchData(){
    this.dataStorage.fecthRecipes().subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogOut(){
    this.authService.logOut();
  }
}
