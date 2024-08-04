import axios from 'axios'

async function getMerges () {
  const result = {}
  const response = await axios.get('https://api.github.com/repos/defra/ffc-doc-statement-generator/pulls?state=closed&per_page=100')
  const pulls = response.data
  console.log(pulls)
  for (const listPullItem of pulls) {
    const pull = await axios.get(listPullItem.url)
    if (pull?.merged_by) {
      result[pull.merged_by.login] = result[pull.merged_by.login] || 0
      result[pull.merged_by.login]++
    }
  }
  console.log(result)
}

getMerges()
