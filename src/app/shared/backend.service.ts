import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
      this.storeService.isLoading = false;
    });
  }

  public getChildren(pageVars: [number, number], sortByName = false, kindergardenId = -1, sortBySignUpDate = false ) {
    this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${pageVars[0]}&_limit=${pageVars[1]}${sortBySignUpDate ? '&_sort=signUpDate' : ''}${sortByName && sortBySignUpDate ? ',name' : sortByName ? '&_sort=name' : ''}${kindergardenId != -1 ? '&kindergardenId='+kindergardenId : ''}`, { observe: 'response' }).subscribe(data => {
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
      this.storeService.isLoading = false;
    });
    }

    public addChildData(child: Child, pageVars: [number, number]) {
      child.signUpDate = new Date().toISOString().substring(0,10);
      this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
        this.getChildren(pageVars);
      })
    }

    public deleteChildData(childId: string, pageVars: [number, number]) {
      this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe(_=> {
        this.getChildren(pageVars);
      })
    }
  }
