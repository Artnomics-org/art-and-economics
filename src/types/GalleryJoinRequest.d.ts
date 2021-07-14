import { User } from './User'
import { Gallery } from './Gallery'

export enum GalleryJoinRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type GalleryJoinRequest = {
  id: number
  artist: User
  gallery: Gallery
  status: GalleryJoinRequestStatus
}
