import { instances, responseMessage } from '../common/config.js'

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

    const words = post.name.match(
      new RegExp(
        `(?:^|[^A-z])(?:${communityValue.keywords.join('|')})(?:$|[^A-z])`,
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
}

function getCommunityInstance(community) {
  const [, instance] = /.*:\/\/(.*)\/c\//.exec(community.actor_id) || []
  return instance
}
