import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Team } from '../model/model';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) { }

  getTeams(organization: string): Observable<Array<Team>> {
    const requestBody = this.apiRequestBody(organization);
    return this.http.post(environment.githubApiUrl, requestBody, this.httpOptions(environment.githubApiToken))
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

  private apiRequestBody(organization: string): string {
    const query = `{
      organization(login: "${organization}") {
        teams(first:20){
          nodes {
            name,
            slug
          }
        }
      }
    }`
    return JSON.stringify({ query: query});
  }
    
  private parsePullRequestsFromApiResponse(apiResponse: Object): Array<Team> {
    const nodePerMember = apiResponse['data']['organization']['teams']['nodes'];
    return nodePerMember.flatMap(member => {
      return {
        name: member['name'],
        slug: member['slug']
      }
    });
  }
}
