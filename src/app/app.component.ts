import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'pr-viewer';

  organizations = environment.supportedOrganizations;
  teams = environment.supportedTeams;

  prParametersFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.prParametersFormGroup = this.fb.group({
      organization: ['', Validators.required],
      team: ['', Validators.required]
    });
  }
  
}
