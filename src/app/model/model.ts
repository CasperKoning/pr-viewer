export class GithubUser {
    login: string;
    avatarUrl: string;
    url: string;
}

export class GithubRepository {
    name: string;
    url: string;
}

export class PullRequest {
    id: number;
    title: string;
    url: string;
    repository: GithubRepository;
    baseBranch: string;
    headBranch: string;
    createdAt: Date;
    nrCommits: number;
    filesChanged: number;
    additions: number;
    deletions: number;
    author: GithubUser;
    approvedReviewers: Array<GithubUser>;
    requestedChangesReviewers: Array<GithubUser>;
    bodyHTML: string;
}

export class Team {
    name: string;
    slug: string;
}

export class PrContext {
    organization: string;
    team: string;
    users: Array<string>;
}
