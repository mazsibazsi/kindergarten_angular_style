import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { Child, ChildResponse } from './interfaces/Child';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public kindergardens: Kindergarden[] = [];
  public children: ChildResponse[] = [];
  public childrenTotalCount: number = 0;
  public isLoading = true;

  public getChildren(kgId: number): Child[] {

    if (kgId < 0) {

      return this.children;
    }
    let children: Child[] = [];
    for (let child of this.children) {
      if (child.kindergardenId === kgId) {
        children.push(child);
      }
    }

    
    
    return children;
  }
}
