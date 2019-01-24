import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PullRequest } from '../model/model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class PullRequestService {
  constructor(private apollo: Apollo) { }

  getPullRequests(organization: string, team: string, users: Array<string>): Observable<Array<PullRequest>> {
    return this.apollo
      .watchQuery({
        query: this.PrsForTeam,
        variables: {
          organization: organization,
          team: team
        },
        pollInterval: 20000,
      })
      .valueChanges
      .pipe(map(result => {
        const prs = this.parsePullRequestsFromQueryResult(result)
          .filter(pr => users.includes(pr.author.login))
          .sort((pr1, pr2) => {
            return pr1.createdAt > pr2.createdAt ? 1 : pr1.createdAt < pr2.createdAt ? -1 : 0;
          });
        return prs;
      }));
  }

  private PrsForTeam = gql`
    query PrsForTeam($organization: String!, $team: String!) {
      organization(login: $organization) {
        teams(query: $team, first:1){
          nodes {
            members(first:20) {
              nodes {
                pullRequests(states: OPEN, first: 20) {
                  nodes {
                    id,
                    title,
                    url,
                    repository { name },
                    baseRefName,
                    headRefName,
                    author { login, avatarUrl },
                    createdAt,
                    bodyHTML,
                    commits { totalCount },
                    changedFiles, 
                    additions,
                    deletions,
                    labels(first: 5) {
                      nodes {
                        name, color
                      }
                    },
                    approvedReviewers: reviews(states:APPROVED, first:10) {
                      nodes {
                        author { login, avatarUrl }
                      }
                    },
                    changesRequestedReviewers: reviews(states:CHANGES_REQUESTED, first:10) {
                      nodes {
                        author { login, avatarUrl }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }  
    }`;
    
  private parsePullRequestsFromQueryResult(queryResult: any): Array<PullRequest> {
    const nodePerMember = queryResult.data.organization.teams.nodes;
    return nodePerMember.flatMap(nodePerMember => {
      const nodePerPullRequests = nodePerMember.members.nodes;
      return nodePerPullRequests.flatMap(nodePerPullRequest => {
        return nodePerPullRequest.pullRequests.nodes.map(pr => {
          return {
            id: pr.id,
            title: pr.title,
            url: pr.url,
            repository: { name: pr.repository.name, url: pr.repository.url },
            baseBranch: pr.baseRefName,
            headBranch: pr.headRefName,
            createdAt: pr.createdAt,
            nrCommits: pr.commits.totalCount,
            filesChanged: pr.changedFiles,
            additions: pr.additions,
            deletions: pr.deletions,
            author: { login: pr.author.login, avatarUrl: pr.author.avatarUrl, url: pr.author.url },
            approvedReviewers: pr.approvedReviewers.nodes.map(n => {
                return { login: n.author.login, avatarUrl: n.author.avatarUrl }
            }),
            requestedChangesReviewers: pr.changesRequestedReviewers.nodes.map(n => {
                return { login: n.author.login, avatarUrl: n.author.avatarUrl }
            }),
            bodyHTML: pr.bodyHTML
          }
        })
      });
    });
  }
}
