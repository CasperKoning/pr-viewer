import { Component, OnInit } from '@angular/core';
import { PullRequest } from '../model/model';
import { Injectable } from '@angular/core';
import { PullRequestService } from '../service/pull-request.service';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  prs: Array<PullRequest> = [];
  selectedPr: PullRequest;
  
  constructor(private pullRequestService: PullRequestService) { }

  ngOnInit() {
    this.pullRequestService
    .getPullRequests()
    .subscribe(prs => this.prs = prs);
  }

  onSelect(pr: PullRequest): void {
    if (this.selectedPr === pr) {
      this.selectedPr = null;
    } else {
      this.selectedPr = pr;
    }
  }

}
