import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, MatDividerModule, MatTableModule, MatButtonModule]
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  @Input() pageVars!: [number, number];
  @Output() selectPageEvent = new EventEmitter<number>();
  
  public page: number = 0;
  public pageSize = 5;

  public columnsNames: string[] = ['name', 'kgName', 'kgAddress', 'age', 'birthDate', 'removeAction'];

  ngOnInit(): void {
    this.backendService.getChildren(this.pageVars);
  }
  

  getAge(birthDate: string) {
    const today = new Date();
    const birthDateTimestamp = new Date(birthDate);
    let age = today.getFullYear() - birthDateTimestamp.getFullYear();
    const m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  selectPage(event: any) {
    this.storeService.isLoading = true;
    console.log(event);
    let currentPage = event.pageIndex+1;
    this.pageVars[1] = event.pageSize;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(this.pageVars);
    
  }

  public numberOfPages(): number {
    return Math.ceil(this.storeService.childrenTotalCount / this.pageSize)
  }

  public numberOfChildren(): number {
    return this.storeService.childrenTotalCount;
  }

  public cancelRegistration(childId: string) {
    this.storeService.isLoading = true;
    this.backendService.deleteChildData(childId, this.pageVars);
    
  }
}


