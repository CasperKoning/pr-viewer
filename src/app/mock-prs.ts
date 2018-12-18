import { PullRequest, GithubUser, GithubRepository } from './model/model';

const mockRepository: GithubRepository = { name: "repo1", url: "https://github.com/repo1" }
const mockUser: GithubUser = { login: "ckoning", avatarUrl: "https://avatars1.githubusercontent.com/u/8633389?s=460&v=4", url: "https://github.com/casperkoning" } 

export const MockPrs: Array<PullRequest> = [
    { id: 1, title: "Create more stuff", url: "http://google.com/", repository: mockRepository, baseBranch: "master", headBranch: "feature/OMG-1", nrCommits: 1, filesChanged: 1, additions: 1, deletions: 1, author: mockUser, approvedReviewers: [mockUser, mockUser], requestedChangesReviewers: []},
    { id: 2, title: "Create more amazing things", url: "http://google.com/", repository: mockRepository, baseBranch: "master", headBranch: "release/staging", nrCommits: 100, filesChanged: 10, additions: 9001, deletions: 51, author: mockUser, approvedReviewers: [mockUser, mockUser, mockUser, mockUser], requestedChangesReviewers: []},
    { id: 3, title: "Add some minor tweaks", url: "http://google.com/", repository: mockRepository, baseBranch: "develop", headBranch: "feature/MEH-10", nrCommits: 2, filesChanged: 1, additions: 100, deletions: 0, author: mockUser, approvedReviewers: [], requestedChangesReviewers: [mockUser]},
    { id: 4, title: "Delete everything!", url: "http://google.com/", repository: mockRepository, baseBranch: "master", headBranch: "delete", nrCommits: 1, filesChanged: 10000, additions: 0, deletions: 900000, author: mockUser, approvedReviewers: [], requestedChangesReviewers: [mockUser, mockUser, mockUser, mockUser]},
    { id: 5, title: "Add a CoC ;-)", url: "http://google.com/", repository: mockRepository, baseBranch: "master", headBranch: "code-of-conduct", nrCommits: 1, filesChanged: 1, additions: 100, deletions: 0, author: mockUser, approvedReviewers: [], requestedChangesReviewers: []},
]
