import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { environment } from '../../environments/environment';
import { TeamService } from '../service/team.service';
import { Team, PrContext } from '../model/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'pr-viewer';

  organizations = environment.supportedOrganizations;
  teams: Array<Team> = [];

  private lastSelectedOrganization;

  prParametersFormGroup: FormGroup;

  @Output() prContextUpdateEvent = new EventEmitter<PrContext>();

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
        });
      }

      if (this.prParametersFormGroup.valid) {
        this.prContextUpdateEvent.emit({
          organization: newVal['organization'],
          team: newVal['team']
        });
      }

    });
  }

}
