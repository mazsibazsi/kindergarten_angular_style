import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [MatButtonModule]
})
export class ButtonComponent {
  @Input() formVisibility!: string;
  @Output() openFormButtonClickedEvent = new EventEmitter();

  public buttonText!: string;

  ngDoCheck() {
    if (this.formVisibility == "visible") {
      this.buttonText = "Formular schließen";
    } else {
      this.buttonText = "Formular öffnen";
    }
  }

  openFormButtonClicked() {
    this.openFormButtonClickedEvent.emit();
  }
  
}
