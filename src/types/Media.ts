import { User } from './User'
import { Tag } from './Tag'
import { Gallery } from './Gallery'

export interface Media {
  id: number
  owner?: User
  creator?: User
  isBurn: boolean
  tokenURI: string
  metadataURI: string
  contentHash: string
  metadataHash: string
  tags: Tag[]
  creationTx: string
  title?: string // user/@username/bids
  description: string
  gallery: Gallery
}

export type MediaMetadata = {
  description: string
  mimeType: string
  name: string
  version: string
}

export type MediaData = {
  contentHash: string
  metadataHash: string
  metadataURI: string
  tokenURI: string
}
