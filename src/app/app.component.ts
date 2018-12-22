import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { environment } from '../environments/environment';
import { TeamService } from './service/team.service';
import { Team } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pr-viewer';

  organizations = environment.supportedOrganizations;
  teams: Array<Team> = [];

  private lastSelectedOrganization;

  prParametersFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private teamService: TeamService) { }

  ngOnInit() {
    this.prParametersFormGroup = this.fb.group({
      organization: ['', Validators.required],
      team: ['', Validators.required]
    });

    this.prParametersFormGroup.valueChanges.subscribe(newVal => {
      if (newVal['organization'] != this.lastSelectedOrganization) {
        this.lastSelectedOrganization = newVal['organization'];
        this.teamService.getTeams(newVal['organization']).subscribe(teams => {
          this.teams = teams;
        })
      }
    });
  }
  
}
