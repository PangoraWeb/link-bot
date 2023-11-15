import chalk from 'chalk'
import { instances, responseMessage } from '../common/config.js'
import db from '../common/database.js'
import { LogCategory, log } from '../common/log.js'

export default async ({
  postView: { post, community },
  botActions: { createComment },
}) => {
  if (!instances.hasOwnProperty(getCommunityInstance(community))) {
    return
  }

  if (
    !instances[getCommunityInstance(community)].hasOwnProperty(community.name)
  ) {
    return
  }

  if (!post.name) {
    return
  }

  let communities = []

  for (const [matchingCommunity, communityValue] of Object.entries(
    instances[getCommunityInstance(community)]
  )) {
    if (!communityValue.hasOwnProperty('keywords')) {
      continue
    }

    if (community.name === matchingCommunity) {
      continue
    }

    const matches = await new Promise(function (resolve, reject) {
      db.all(
        `SELECT COUNT(*) as count FROM triggeredon WHERE community = ? AND name = ?`,
        [matchingCommunity, post.name],
        (err, rows) => {
          if (err) {
            reject(err)
          }

          if (!rows) {
            resolve(0)
          }

          resolve(rows[0].count)
        }
      )
    })

    if (matches > 0) {
      continue
    }

    const words = post.name.match(
      new RegExp(
        `(?:^|[^A-Za-z0-9])(?:${communityValue.keywords.join(
          '|'
        )})(?:$|[^A-Za-z0-9])`,
        'gi'
      )
    )

    if (words && words.length > 0) {
      communities.push(matchingCommunity)
    }
  }

  if (communities.length === 0) {
    return
  }

  createComment({
    content: responseMessage.replace(
      '${INSTANCES}',
      communities
        .map((c) => `- !${c}@${getCommunityInstance(community)}`)
        .join('\n')
    ),
    post_id: post.id,
  })

  db.run(
    `INSERT INTO triggeredon (community, name) VALUES (?, ?)`,
    [community.name, post.name],
    (err) => {
      if (err) {
        return console.error(err.message)
      }
      log('DB', 'Inserted new post into database.', LogCategory.SUCCESS)
    }
  )
}

function getCommunityInstance(community) {
  const [, instance] = /.*:\/\/(.*)\/c\//.exec(community.actor_id) || []
  return instance
}
