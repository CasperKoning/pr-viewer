import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PullRequest } from '../model/model';
import { PullRequestService } from '../service/pull-request.service';
import { environment } from '../../environments/environment';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  prs: Array<PullRequest> = [];
  
  @Input() prParametersFormGroup: FormGroup;

  constructor(private pullRequestService: PullRequestService) { }

  ngOnInit() {
    this.prParametersFormGroup.valueChanges
      .pipe(debounceTime(1000)) // Debouncing input to avoid a bunch of requests while typing
      .subscribe(newVal => {
        if (!this.prParametersFormGroup.invalid) {
          this.pullRequestService
              .getPullRequests(environment.githubApiUrl, environment.githubApiToken, newVal['organization'], newVal['team'])
              .subscribe(prs => this.prs = prs);
        }
      })
  }

}
