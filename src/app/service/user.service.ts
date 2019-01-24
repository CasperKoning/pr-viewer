import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team, GithubUser } from '../model/model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class UserService {
  constructor(private apollo: Apollo) { }

  getUsers(organization: string, team: string): Observable<Array<GithubUser>> {
    return this.apollo
      .watchQuery({
        query: this.UsersForTeam,
        variables: {
          organization: organization,
          team: team,
        }
      })
      .valueChanges
      .pipe(map(result => this.parseUsersFromQueryResult(result)));
  }

  private UsersForTeam = gql`
    query TeamsForOrganization($organization: String!, $team: String!) {
      organization(login: $organization) {
        teams(query: $team, first:1){
          nodes {
            members(first:20) {
              nodes {
                login,
                avatarUrl,
                url,
              }
            }
          }
        }
      }
    }
  `
    
  private parseUsersFromQueryResult(apiResponse: any): Array<GithubUser> {
    const nodePerMember = apiResponse.data.organization.teams.nodes[0].members.nodes;
    return nodePerMember.flatMap(member => {
      return {
        login: member.login,
        avatarUrl: member.avatarUrl,
        url: member.url,
      }
    });
  }
}
