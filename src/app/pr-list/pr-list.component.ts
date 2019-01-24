import { Component, OnInit } from '@angular/core';
import { PullRequest, PrContext } from '../model/model';
import { PullRequestService } from '../service/pull-request.service';
import { PrContextService } from '../service/pr-context.service';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  prs: Array<PullRequest> = [];
  
  constructor(private pullRequestService: PullRequestService, private prContextService: PrContextService) { }

  ngOnInit() {
    this.updatePrs(this.prContextService.loadInitialPrContext());
    this.prContextService.observePrContext().subscribe(prContext => {
      this.updatePrs(prContext);
    });
  }

  private updatePrs(prContext: PrContext) {
    if (prContext) {
      this.pullRequestService
        .getPullRequests(prContext.organization, prContext.team, prContext.users)
        .subscribe(prs => this.prs = prs);
    }
  }
}
