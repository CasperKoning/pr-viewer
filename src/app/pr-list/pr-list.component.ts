import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { PullRequest, PrContext } from '../model/model';
import { PullRequestService } from '../service/pull-request.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  prs: Array<PullRequest> = [];
  
  @Input() prContext: PrContext;

  constructor(private pullRequestService: PullRequestService) { }

  ngOnInit() {
    this.updatePrs();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.prContext = changes.prContext.currentValue;
    this.updatePrs();
  }

  private updatePrs() {
    if (this.prContext) {
      this.pullRequestService
        .getPullRequests(environment.githubApiUrl, environment.githubApiToken, this.prContext.organization, this.prContext.team)
        .subscribe(prs => this.prs = prs);
    }
  }
}
