import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { setContext } from 'apollo-link-context';

const uri = environment.githubApiUrl;
export function createApollo(httpLink: HttpLink) {
  const authorizationLink = setContext(_ => {
    return {
      headers: { authorization: `Bearer ${environment.githubApiToken}`}
    };
  });

  return {
    link: authorizationLink.concat(httpLink.create({uri})),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
