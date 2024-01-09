import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DATE_LOCALE } from 'src/app/shared/constants';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, MatDividerModule, MatTableModule, MatButtonModule, MatSelectModule, MatSortModule, MatCheckboxModule]
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  @Input() pageVars!: [number, number];
  @Output() selectPageEvent = new EventEmitter<number>();
  @ViewChild('kgTbSort') empTbSort = new MatSort();

  public page: number = 0;
  public pageSize = 5;
  public kgFilter = -1;
  public sortByName: [boolean, boolean] = [false, false];
  public sortBySignUpDate: [boolean, boolean] = [false, false];
  public tableName = 'Name *';
  public tableSignUpDate = 'Sign Up Date *';

  public columnsNames: string[] = ['name', 'kgName', 'kgAddress', 'age', 'birthDate', 'signUpDate', 'removeAction'];

  ngOnInit(): void {
    
    this.backendService.getChildren(this.pageVars);

  }
  
  selectKgFilter(event: any): void {
    this.kgFilter = event;
    this.storeService.isLoading = true;
    this.backendService.getChildren(this.pageVars, this.sortByName, this.kgFilter, this.sortBySignUpDate);
  }

  selectSortByName(event: any): void {
    this.storeService.isLoading = true;
    if (this.tableName == 'Name *') {
      this.tableName = 'Name ↓';
      this.sortByName = [true, false];
    }
    else if (this.tableName == 'Name ↓') {
      this.tableName = 'Name ↑';
      this.sortByName = [true, true];
    } else {
      this.tableName = 'Name *'
      this.sortByName = [false, false];
    }
    this.backendService.getChildren(this.pageVars, this.sortByName, this.kgFilter, this.sortBySignUpDate);
  }

  selectSortBySignUpDate(event: any): void {
    this.storeService.isLoading = true;
    if (this.tableSignUpDate == 'Sign Up Date *') {
      this.tableSignUpDate = 'Sign Up Date ↓';
      this.sortBySignUpDate = [true, false];
    }
    else if (this.tableSignUpDate == 'Sign Up Date ↓') {
      this.tableSignUpDate = 'Sign Up Date ↑';
      this.sortBySignUpDate = [true, true];
    } else {
      this.tableSignUpDate = 'Sign Up Date *'
      this.sortBySignUpDate = [false, false];
    }
    this.backendService.getChildren(this.pageVars, this.sortByName, this.kgFilter, this.sortBySignUpDate);
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
    this.backendService.getChildren(this.pageVars, this.sortByName, this.kgFilter, this.sortBySignUpDate);
    
  }

  public formatDate(date: string): string {
    let formatted = new Date(date);
    return formatted.toLocaleDateString(DATE_LOCALE);
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


