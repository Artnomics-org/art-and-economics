import type { MediaToScreen } from './MediaToScreen'
import { Tag } from './Tag'
import { Gallery } from './Gallery'
import { GalleryJoinRequest } from './GalleryJoinRequest'
import { Media } from './Media'
import { About } from './About'

export enum UserRole {
  Collector = 'COLLECTOR',
  Artist = 'ARTIST',
  SuperAdmin = 'SUPER_ADMIN',
}

export type MatatakiUserStat = {
  id: number
  username: string
  platform: string
  email: string
  nickname: string
  avatar: string
  create_time: string
  introduction: string
  accept: number
  source: string
  reg_ip: string
  last_login_time: string
  is_recommend: number
  referral_uid: number
  last_login_ip: string
  level: number
  status: number
  banner: null
  accounts: number
  follows: number
  fans: number
  articles: number
  drafts: number
  supports: number
  points: number
  referral_amount: number
  bookmarks: number
}

export interface User {
  id: number
  address: string
  username: string
  avatar: string
  nickname: string
  bio: string

  isActive: boolean
  /**
   * 是否为推荐的艺术家 (Featured artist)
   * 为 true 时会显示在艺术家字母排序列表里
   */
  isRecommendArtist: boolean
  /**
   * 是否为艺术家页面 banner 推荐的艺术家
   */
  isFeaturedInBanner: boolean
  /**
   * 是否为首页里推荐的艺术家
   */
  isTopArtist: boolean

  verified: boolean
  role: UserRole
  detailed?: unknown
  personalPicture?: unknown
  artworks?: string[]

  telegram?: string
  twitter?: string
  email?: string
  medium?: string
  facebook?: string
  presentations?: string[]

  about?: About

  // topArtist 使用 Media[]， 其他用 number[]
  createdMedia?: number[] | Media[]
  ownedMedia?: number[]
  articles?: number[]
  waitingForScreen?: MediaToScreen[]
  belongsTo?: Gallery[]
  ownedGalleries?: Gallery[]
  requestedJoinGallery?: GalleryJoinRequest[]
  tags?: Tag[]
}

export type MintAndTransferParameters = {
  creator: string
  data: {
    tokenURI: string
    metadataURI: string
    contentHash: string
    metadataHash: string
  }
  bidShares: {
    prevOwner: { value: BigNumberish }
    creator: { value: BigNumberish }
    owner: { value: BigNumberish }
  }
  to: string
  sig: {
    deadline: BigNumberish
    v: BigNumberish
    r: string
    s: string
  }
}
