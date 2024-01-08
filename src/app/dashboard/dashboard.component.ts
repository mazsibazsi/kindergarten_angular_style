import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AddDataComponent } from './add-data/add-data.component';
import { DataComponent } from './data/data.component';
import { ButtonComponent } from './button/button.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { StoreService } from '../shared/store.service';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [MatDividerModule, CommonModule, AddDataComponent, DataComponent, ButtonComponent, MatFormFieldModule, MatSelectModule, MatOptionModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class DashboardComponent {

  constructor(public store: StoreService) {}

  public pageVars: [number, number] =  [1, 5];
  
  public formVisibility: string = "visible";

  public receiveMessage(newPageCount: number): void {
    this.pageVars[0] = newPageCount;
  }

  public toggleAddDataVisibility(): void {
    if (this.formVisibility == "hidden") {
      this.formVisibility = "visible";
    } else {
      this.formVisibility = "hidden";
    }
  }

}
