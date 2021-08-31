import { default as BACKEND_CLIENT } from './client'
import { PaginationResult } from '../types/PaginationResult'
import { User } from '../types/User'
import { BidLog } from '../types/Bid.d'
import { GeneralResponse } from '../types/Backend'
import { setCookie } from '../utils/cookie'
import { AxiosResponse } from 'axios'

interface SignInPermit {
  signature: string
  message: string
  from?: string
}

export async function loginWithPermit(permit: SignInPermit): Promise<string> {
  const { data } = await BACKEND_CLIENT.post<{ data: string }>('/auth/login', permit)
  const token = data.data
  setCookie('token', token, 1)
  return token
}

export async function checkIsWalletRegistered(wallet: string): Promise<{
  isUserExist: boolean
  user: User
}> {
  const { data } = await BACKEND_CLIENT.get<{
    isUserExist: boolean
    user: User
  }>(`/user/findByAddress/${wallet}`)
  return data
}

/**
 * 注册用户
 * @param profile 注册的用户资料
 * @param permit 签名和信息
 * @returns 用户访问令牌
 */
export async function registerUser(
  // profile: { nickname: string; bio: string; username: string; avatar: string },
  profile: Pick<User, 'username' | 'nickname' | 'avatar' | 'bio'>,
  permit: SignInPermit,
): Promise<string> {
  const payload = {
    nickname: profile.nickname,
    bio: profile.bio,
    username: profile.username,
    avatar: profile.avatar,
    signature: permit.signature,
    signingMessage: permit.message,
  }
  await BACKEND_CLIENT.post<{ isGood: boolean }>('/user', payload)
  const accessToken = await loginWithPermit(permit)
  return accessToken
}
/**
 * 更新用户资料
 * @param payload 注册的用户资料
 * @returns 请求结果
 */
export async function updateUser(
  id: number,
  payload: {
    nickname?: string
    bio?: string
    username?: string
    avatar?: string
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<AxiosResponse<any>> {
  return await BACKEND_CLIENT({
    method: 'patch',
    url: `/user/${id}`,
    data: payload,
  })
}

export async function listUsers({
  page = 1,
  limit = 9,
}: {
  page?: number
  limit?: number
}): Promise<PaginationResult<User>> {
  const { data } = await BACKEND_CLIENT.get<PaginationResult<User>>('/user', {
    params: { page, limit },
  })
  return data
}
// 用户 收藏家
export async function listUsersCollector(): Promise<User> {
  const { data } = await BACKEND_CLIENT.get<GeneralResponse<User>>('/user/collector')
  return data.data
}
// 用户 艺术家
export async function listUsersArtist(): Promise<User[]> {
  const { data } = await BACKEND_CLIENT.get<GeneralResponse<User[]>>('/user/artist')
  return data.data
}
export async function getUser(username: string): Promise<User> {
  const { data } = await BACKEND_CLIENT.get<User>(`/user/@${username}`)
  return data
}

export async function getUserBids(username: string): Promise<BidLog[]> {
  const { data } = await BACKEND_CLIENT.get<Array<BidLog>>(`/user/@${username}/bids`)
  return data
}

// 获取用户的Tags
export async function getUserTags(username: string): Promise<User> {
  const { data } = await BACKEND_CLIENT.get<User>(`/user/@${username}/tags`)
  return data
}

export async function getUserRelation(username: string, relation: string): Promise<User> {
  const { data } = await BACKEND_CLIENT.get<User>(`/user/@${username}/${relation}`)
  return data
}
// top artist
export async function userTopArtist(): Promise<AxiosResponse<GeneralResponse<User[]>>> {
  return await BACKEND_CLIENT.get<GeneralResponse<User[]>>('/user/topArtist')
}
// artist banner
export async function userFeaturedArtistInBanner(): Promise<AxiosResponse<GeneralResponse<User[]>>> {
  return await BACKEND_CLIENT.get<GeneralResponse<User[]>>('/user/featuredArtistInBanner')
}
// artist
export async function userFeaturedArtist(): Promise<AxiosResponse<GeneralResponse<User[]>>> {
  return await BACKEND_CLIENT.get<GeneralResponse<User[]>>('/user/featuredArtist')
}
