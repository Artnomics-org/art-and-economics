/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import { Media, MediaMetadata } from '../types/Media'
import client, { backendClient } from './client'
import { PaginationResult } from '../types/PaginationResult'
import { GeneralResponse } from '../types/Backend'
import { MintAndTransferParameters } from '../types/MintAndTransfer'
import { BidLog } from '../types/Bid'

export const backendSWRFetcher = (url: string): Promise<any> => backendClient.get(url).then((res) => res.data)
export const axiosFetcher = (url: string) => axios.get(url).then((res) => res.data)

/**
 * 主要是为了 SSG 预先渲染
 */
export async function getHotMediaList(take = 10): Promise<Array<Media>> {
  const { data } = await backendClient.get<Array<Media>>('/media/hot', {
    params: { take },
  })
  return data
}

export async function getMediaList(page = 1, limit = 9, order = 'DESC'): Promise<PaginationResult<Media>> {
  const { data } = await backendClient.get<PaginationResult<Media>>('/media', {
    params: {
      page,
      limit,
      order,
    },
  })
  return data
}

export async function getMediaById(id: string | number): Promise<Media> {
  const { data } = await backendClient.get<Media>(`/media/${id}`)
  return data
}

export async function getMediaMetadata(url: string): Promise<MediaMetadata> {
  const { data } = await axios.get<MediaMetadata>(url)
  return data
}

export async function getMediaBids(id: string | number): Promise<BidLog[]> {
  const { data } = await backendClient.get<BidLog[]>(`/media/${id}/bids`)
  return data
}

// 提交 media
type PostMediaParams = {
  txHash: string
  tags: string[]
  gallery?: number
  id?: number
}
type PostMediaResponse = {
  code: number
  data?: {
    tokenId: number
  }
}
export async function PostMedia({
  txHash,
  tags,
  gallery,
  id,
}: PostMediaParams): Promise<AxiosResponse<PostMediaResponse>> {
  // bad habit to `any` bro
  return await backendClient.post<PostMediaResponse>('/media', {
    txHash,
    tags,
    gallery,
    id,
  })
}

export function sendToPublisherForPreview(
  GalleryId: number,
  data: {
    title: string
    description: string
    tokenURI: string
    permitData: MintAndTransferParameters
    tags: string[]
    gallery: number
  },
): Promise<
  AxiosResponse<
    GeneralResponse<{
      msg: string
    }>
  >
> {
  return backendClient.post<GeneralResponse<{ msg: string }>>(`/media/gasfreeCreate/${GalleryId}`, data)
}

export async function isMediaContentExisted(params: {
  contentHash: string
}): Promise<AxiosResponse<GeneralResponse<{ isExist: boolean }>>> {
  return await client.get<GeneralResponse<{ isExist: boolean }>>(`/media/utils/isContentExisted`, { params })
}

export function mediaGasfreeCreateForPublisher(params: { gid: number }): Promise<AxiosResponse<GeneralResponse<any>>> {
  return backendClient.get<GeneralResponse<any>>(`/media/gasfreeCreate/forPublisher`, { params })
}

export function mediaSearch(data: {
  gallery: number
  relations: string[]
}): Promise<AxiosResponse<GeneralResponse<Media[]>>> {
  return backendClient.post<GeneralResponse<Media[]>>(`/media/search`, data)
}
