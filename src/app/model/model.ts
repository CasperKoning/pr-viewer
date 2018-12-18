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
    nrCommits: number;
    filesChanged: number;
    additions: number;
    deletions: number;
    author: GithubUser;
    approvedReviewers: Array<GithubUser>;
    requestedChangesReviewers: Array<GithubUser>;
}