import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatButtonModule, MatSnackBarModule],
})
export class AddDataComponent implements OnInit{

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService, private snackBar: MatSnackBar) {
  }
  public addChildForm: any;
  @Input() pageVars!: [number, number];

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required]
    })
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      this.storeService.isLoading = true;
      console.log(this.pageVars);
      this.backendService.addChildData(this.addChildForm.value, this.pageVars);
      this.snackBar.open("✅ Anmeldung erfolgreich!", "Schließen")
      
    } else {
      this.snackBar.open("❌ Anmeldung nicht erfolgreich!", "Schließen")
    }
    
  }
}
