# github-merge-log

View which account merged a Pull Request on GitHub

## Pre-requisites

- Node.js >= 20

## Installation

```bash
npm install -g github-merge-log
```

## Usage

1. add a `.env` file to root of your project with the following content:

```bash
GITHUB_TOKEN=your_github_token
ORG_NAME=your_org_or_account_name
REPO_NAME=your_repo_name
```

2. Run the application

```bash
npm run start
```

### Example output

```json
[
  {
    "pullRequest": "https://github.com/my-org/my-repo/pull/1",
    "mergedBy": "my-github-name",
    "mergedAt": "2024-08-05T15:00:00Z"
  },
  {
    "pullRequest": "https://github.com/my-org/my-repo/pull/2",
    "mergedBy": "my-friends-github-name",
    "mergedAt": "2024-08-04T15:00:00Z"
  }
]
```
