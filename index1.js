const {Octokit} = require('@octokit/rest');
const octokit = new Octokit();
// octokit.authenticate({
//     type: 'basic',
//     username: "sumitsn590@gmail.com",
//     password: "sumiTS1@"
// });
// Variables for Repo name and description
var description = "repo creation using git api";
var name = "testing";
//Create a Repository online via Github Api
const createGitHubRepo = octokit.repos.create(
   {name, description}
);