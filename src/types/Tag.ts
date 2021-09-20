import { Media } from '../constants/nfts/Media'

export type Tag = {
  id: number
  name: string
  relatedMedias?: Media[] | undefined
}
