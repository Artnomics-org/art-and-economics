import { EventAt } from './EventAt'
import { Media } from './Media'
import { User } from './User'

export enum AskActionType {
  AskCreated = 'AskCreated',
  AskRemoved = 'AskRemoved',
}

export class Ask {
  id: number
  type: AskActionType
  at: EventAt
  media: Media
  mediaId: number
  amount: string
  currency: string
  who: User
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBackendAsk(obj: any): obj is Ask {
  return Boolean(obj.currency) && Boolean(obj.type) && obj.type.slice(0, 3) === 'Ask'
}
