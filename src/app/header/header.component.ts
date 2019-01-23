import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { environment } from '../../environments/environment';
import { TeamService } from '../service/team.service';
import { UserService } from '../service/user.service';
import { Team, PrContext, GithubUser } from '../model/model';
import { PrContextService } from '../service/pr-context.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'pr-viewer';
  
  availableOrganizations = environment.supportedOrganizations;
  availableTeams: Array<Team>
  availableUsers: Array<GithubUser>
  
  previousPrContext: PrContext
  currentPrContext: PrContext

  prParametersFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private teamService: TeamService, private userService: UserService, private prContextService: PrContextService) { }

  ngOnInit() {
    this.currentPrContext = this.prContextService.loadInitialPrContext();
    if (this.currentPrContext.organization) {
      this.teamService.getTeams(this.currentPrContext.organization).subscribe(teams => {
        this.availableTeams = teams;
      });
      if (this.currentPrContext.team) {
        this.userService.getUsers(this.currentPrContext.organization, this.currentPrContext.team).subscribe(users => {
          this.availableUsers = users;
        });
      }
      this.prParametersFormGroup = this.fb.group({
        organization: [this.currentPrContext.organization ? this.currentPrContext.organization : '', Validators.required],
        team: [this.currentPrContext.team ? this.currentPrContext.team : '', Validators.required],
        users: [this.currentPrContext.users ? this.currentPrContext.users : '', Validators.required],
      });
    } else {
      this.prParametersFormGroup = this.fb.group({
        organization: ['', Validators.required],
        team: ['', Validators.required],
        users: ['', Validators.required],
      });
    }

    this.prParametersFormGroup.valueChanges.subscribe(newVal => {
      this.previousPrContext = this.currentPrContext;
      if (newVal['organization'] != this.previousPrContext.organization) {
        const newPrContext = {
          organization: newVal['organization'],
          team: null,
          users: null,
        };
        this.currentPrContext = newPrContext;
        this.teamService.getTeams(newPrContext.organization).subscribe(teams => {
          this.availableTeams = teams;
        });
        this.prParametersFormGroup.setValue({
          organization: newPrContext.organization,
          team: null
        });
      } else if (newVal['team'] != this.previousPrContext.team) {
        const newPrContext = {
          organization: newVal['organization'],
          team: newVal['team'],
          users: null,
        }
        this.currentPrContext = newPrContext;
        this.userService.getUsers(newPrContext.organization, newPrContext.team).subscribe(users => {
          this.availableUsers = users;
        });
        this.prParametersFormGroup.setValue({
          organization: newPrContext.organization,
          team: newPrContext.team,
          users: newPrContext.users,
        });
      } else {
        const newPrContext = {
          organization: newVal['organization'],
          team: newVal['team'],
          users: newVal['users'],
        }
        this.currentPrContext = newPrContext;
        if (this.prParametersFormGroup.valid) {
          this.prContextService.storePrContext(this.currentPrContext);
        }
      }
    });
  }

}
