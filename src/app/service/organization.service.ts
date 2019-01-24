import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class OrganizationService {

  constructor(private apollo: Apollo) { }

  getOrganizations(): Observable<Array<String>> {
    return this.apollo
      .watchQuery({
        query: this.Organizations,
      })
      .valueChanges
      .pipe(map(result => this.parseOrganizationsFromQueryResult(result)));
  }

  private Organizations = gql`
    query Organizations {
      organizations(first:100) {
        nodes {
          login,
          viewerIsAMember,
        }
      }
    }`

  private parseOrganizationsFromQueryResult(apiResponse: Object): Array<String> {
    const nodePerOrg = apiResponse['data'].organizations.nodes;
    return nodePerOrg
      .filter(org => org.viewerIsAMember)
      .map(org => org.login);
  }

}
