import { Component, OnInit, Input } from '@angular/core';
import { PullRequest } from '../model/model';

@Component({
  selector: 'app-pull-request-card',
  templateUrl: './pull-request-card.component.html',
  styleUrls: ['./pull-request-card.component.css']
})
export class PullRequestCardComponent implements OnInit {

  @Input() pr: PullRequest;
  @Input() isSelected: boolean;

  constructor() { }

  ngOnInit() {
  }

}
