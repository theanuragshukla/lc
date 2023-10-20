const profileQuery = `
query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
        username
        githubUrl
        linkedinUrl
        profile {
            ranking
            userAvatar
            realName
            aboutMe
            school
            websites
            skillTags
        }
    }
}`

const contestRanking = `
query ($username: String!) {
  matchedUser(username: $username) {
        username
        githubUrl
        linkedinUrl
        profile {
            ranking
            userAvatar
            realName
            aboutMe
            school
            websites
            skillTags
        }
    }

    userContestRanking(username: $username) {
        rating
        globalRanking
    }
   }
`

module.exports = {
    profileQuery, contestRanking
}
