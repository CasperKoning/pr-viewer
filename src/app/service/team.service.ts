import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../model/model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class TeamService {
  constructor(private apollo: Apollo) { }

  getTeams(organization: string): Observable<Array<Team>> {
    return this.apollo
      .watchQuery({
        query: this.TeamsForOrganization,
        variables: {
          organization: organization
        }
      })
      .valueChanges
      .pipe(map(result => this.parseTeamsFromQueryResult(result)));
  }

  private TeamsForOrganization = gql`
    query TeamsForOrganization($organization: String!) {
      organization(login: $organization) {
        teams(first:20){
          nodes {
            name,
            slug
          }
        }
      }
    }
  `
    
  private parseTeamsFromQueryResult(apiResponse: any): Array<Team> {
    const nodePerMember = apiResponse.data.organization.teams.nodes;
    return nodePerMember.flatMap(member => {
      return {
        name: member.name,
        slug: member.slug,
      }
    });
  }
}
