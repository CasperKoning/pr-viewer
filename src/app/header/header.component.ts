import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { environment } from '../../environments/environment';
import { TeamService } from '../service/team.service';
import { Team, PrContext } from '../model/model';
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
  
  previousPrContext: PrContext
  currentPrContext: PrContext

  prParametersFormGroup: FormGroup;

  @Output() prContextUpdateEvent = new EventEmitter<PrContext>();

  constructor(private fb: FormBuilder, private teamService: TeamService, private prContextService: PrContextService) { }

  ngOnInit() {
    this.currentPrContext = this.prContextService.retrievePrContext();
    if (this.currentPrContext) {
      this.teamService.getTeams(this.currentPrContext.organization).subscribe(teams => {
        this.availableTeams = teams;
      });
      this.prParametersFormGroup = this.fb.group({
        organization: [this.currentPrContext.organization ? this.currentPrContext.organization : '', Validators.required],
        team: [this.currentPrContext.team ? this.currentPrContext.team : '', Validators.required]
      });
      if (this.prParametersFormGroup.valid) {
        this.prContextUpdateEvent.emit(this.currentPrContext);
      }
    } else {
      this.prParametersFormGroup = this.fb.group({
        organization: ['', Validators.required],
        team: ['', Validators.required]
      });
    }

    this.prParametersFormGroup.valueChanges.subscribe(newVal => {
      this.previousPrContext = this.currentPrContext;
      if (newVal['organization'] != this.previousPrContext.organization) {
        const newPrContext = {
          organization: newVal['organization'],
          team: null
        };
        this.currentPrContext = newPrContext;
        this.teamService.getTeams(newPrContext.organization).subscribe(teams => {
          this.availableTeams = teams;
        });
        this.prParametersFormGroup.setValue({
          organization: newPrContext.organization,
          team: null
        });
      } else {
        const newPrContext = {
          organization: newVal['organization'],
          team: newVal['team']
        }
        this.currentPrContext = newPrContext;
        if (this.prParametersFormGroup.valid) {
          this.prContextService.storePrContext(this.currentPrContext);
          this.prContextUpdateEvent.emit(this.currentPrContext);
        }
      }
    });
  }

}
