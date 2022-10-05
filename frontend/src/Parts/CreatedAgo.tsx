import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import ja from 'timeago.js/lib/lang/ja'

timeago.register('ja', ja)

interface Props {
  createdTime: number
}

export const CreatedAgo = ({ createdTime }: Props) => {
  return <TimeAgo datetime={createdTime} locale="ja" />
}
