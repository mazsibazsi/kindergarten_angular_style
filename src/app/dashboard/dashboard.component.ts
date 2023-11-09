import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public currentPage: number = 1;
  
  public formVisibility: string = "hidden";

  public receiveMessage(newPageCount: number): void {
    this.currentPage = newPageCount;
  }

  public toggleAddDataVisibility(): void {
    if (this.formVisibility == "hidden") {
      this.formVisibility = "visible";
    } else {
      this.formVisibility = "hidden";
    }
  }

}
