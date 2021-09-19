import { BidLog } from './Bid'
import { MediaLog } from './MediaLog'
import { User } from './User'

export class BidLogWithUser extends BidLog {
  matchedBidder?: User
}

export class MediaLogWithUser extends MediaLog {
  fromUser?: User
  toUser?: User
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBidLogWithUser(obj: BidLogWithUser | any): obj is BidLogWithUser {
  return Boolean((obj as BidLogWithUser).bidder)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMediaLogWithUser(obj: MediaLogWithUser | any): obj is MediaLogWithUser {
  return Boolean((obj as MediaLogWithUser).to)
}
