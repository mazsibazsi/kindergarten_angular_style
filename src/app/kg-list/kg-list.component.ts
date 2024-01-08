import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import {MatCardModule, MatCard} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-kg-list',
  templateUrl: './kg-list.component.html',
  imports: [CommonModule, MatCardModule],
  standalone: true,
  styleUrls: ['./kg-list.component.scss']
})
export class KgListComponent implements OnInit {
  constructor(public store: StoreService, public backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getKindergardens();
  }
}
