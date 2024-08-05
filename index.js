import axios from 'axios'

const orgName = process.env.ORG_NAME
const repoName = process.env.REPO_NAME
const token = process.env.GITHUB_TOKEN

async function getMerges () {
  const results = []
  const response = await axios.get(`https://api.github.com/repos/${orgName}/${repoName}/pulls?state=closed&per_page=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28 ',
    },
  })
  const pulls = response.data
  for (const listPullItem of pulls) {
    const pull = await axios.get(listPullItem.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28 ',
      },
    })
    const pullMergeData = pull?.data?.merged_by
    if (pullMergeData) {
      results.push({
        pullRequest: pull.data.commits_url,
        mergedBy: pullMergeData.login,
        mergedAt: pull.data.merged_at,
      })
    }
  }
  results.sort((a, b) => a.mergedAt - b.mergedAt)
  console.log(results)
}

getMerges()
