import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent implements OnInit {
  isDarkThemeOn: boolean = false;
  darkThemeFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.darkThemeFormGroup = this.fb.group({
      enableDarkTheme: ['']
    });

    this.darkThemeFormGroup.valueChanges.subscribe(newVal => {
      this.isDarkThemeOn = newVal['enableDarkTheme'];
      // Until I've found a better solution, we switch themes by globally finding the body tag and toggling a CSS class on it
      let body = document.getElementsByTagName('body')[0];
      if (this.isDarkThemeOn) {
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
      }
    });

  }

}
