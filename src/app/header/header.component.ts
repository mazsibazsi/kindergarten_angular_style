import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatToolbarModule, RouterModule, MatButtonModule],
})
export class HeaderComponent implements OnInit {

  public title: string = 'Kindergoarden-App';
  public imagePath: string = "./../assets/images/kindergarden.jpg";


  constructor() { }

  ngOnInit(): void {
  }

}