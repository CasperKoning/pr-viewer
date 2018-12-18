import { Component, OnInit } from '@angular/core';
import { MockPrs } from '../mock-prs';
import { PullRequest } from '../model/model';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  prs = MockPrs;
  selectedPr: PullRequest;

  constructor() { }

  ngOnInit() {
  }

  onSelect(pr: PullRequest): void {
    this.selectedPr = pr;
  }

}
