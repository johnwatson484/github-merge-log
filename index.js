import axios from 'axios'

const orgName = process.env.ORG_NAME
const repoName = process.env.REPO_NAME
const token = process.env.GITHUB_TOKEN

async function getMerges () {
  const results = []

  setAxiosHeaders()

  const pulls = await getPullRequests()

  for (const listPullItem of pulls) {
    const pull = await getPullRequest(listPullItem.url)
    if (pull.merged_by) {
      results.push({
        pullRequest: pull.html_url,
        mergedBy: pull.merged_by.login,
        mergedAt: pull.merged_at,
      })
    }
  }

  sortResults(results)

  console.log(results)
}

function setAxiosHeaders () {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.defaults.headers.common['X-GitHub-Api-Version'] = '2022-11-28'
}

async function getPullRequests () {
  const response = await axios.get(`https://api.github.com/repos/${orgName}/${repoName}/pulls?state=closed&per_page=100`)
  const data = response.data
  return data
}

async function getPullRequest (url) {
  const response = await axios.get(url)
  return response.data
}

function sortResults (results) {
  results.sort((a, b) => a.mergedAt - b.mergedAt)
}

getMerges()
