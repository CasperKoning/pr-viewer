import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PullRequest } from '../model/model';

@Injectable()
export class PullRequestService {
  constructor(private http: HttpClient) { }

  getPullRequests(apiUrl: string, apiToken: string, organization: string, team: string): Observable<Array<PullRequest>> {
    const requestBody = this.apiRequestBody(organization, team);
    console.log(requestBody);
    return this.http.post(apiUrl, requestBody, this.httpOptions(apiToken))
      .pipe(map(res => this.parsePullRequestsFromApiResponse(res)));
  }

  private httpOptions(apiToken: string) {
    return { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',  
        'Authorization': `bearer ${apiToken}`
      })
    }
  };

  private apiRequestBody(organization: string, team: string): string {
    const query = `{
      organization(login: "${organization}") {
        teams(query: "${team}", first:1){
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
    }`
    return JSON.stringify({ query: query});
  }
    
  private parsePullRequestsFromApiResponse(apiResponse: Object): Array<PullRequest> {
    const nodePerMember = apiResponse['data']['organization']['teams']['nodes'];
    return nodePerMember.flatMap(nodePerMember => {
      const nodePerPullRequests = nodePerMember['members']['nodes']
      return nodePerPullRequests.flatMap(nodePerPullRequest => {
        return nodePerPullRequest['pullRequests']['nodes'].map(pr => {
          return {
            id: pr['id'],
            title: pr['title'],
            url: pr['url'],
            repository: { name: pr['repository']['name'], url: pr['repository']['url']},
            baseBranch: pr['baseRefName'],
            headBranch: pr['headRefName'],
            createdAt: pr['createdAt'],
            nrCommits: pr['commits']['totalCount'],
            filesChanged: pr['changedFiles'],
            additions: pr['additions'],
            deletions: pr['deletions'],
            author: { login: pr['author']['login'], avatarUrl: pr['author']['avatarUrl'], url: pr['author']['url'] },
            approvedReviewers: pr['approvedReviewers']['nodes'].map(n => {
                return { login: n['author']['login'], avatarUrl: n['author']['avatarUrl']}
            }),
            requestedChangesReviewers: pr['changesRequestedReviewers']['nodes'].map(n => {
                return { login: n['author']['login'], avatarUrl: n['author']['avatarUrl']}
            }),
            bodyHTML: pr['bodyHTML']
          }
        })
      });
    });
  }
}
