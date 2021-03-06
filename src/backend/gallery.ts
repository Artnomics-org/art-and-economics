/* eslint-disable @typescript-eslint/no-explicit-any */
import { default as BACKEND_CLIENT } from './client'
import { GeneralResponse, PaginationProps } from '../types/Backend'
import { Gallery } from '../types/Gallery'
import { GalleryJoinRequest, GalleryJoinRequestStatus } from '../types/GalleryJoinRequest'
import { User } from '../types/User'
import { AxiosResponse } from 'axios'

export async function getGalleryId(id: number): Promise<AxiosResponse<any>> {
  return await BACKEND_CLIENT.get(`/gallery/${id}`)
}

export async function getGallery(params: PaginationProps): Promise<Gallery[]> {
  const { data } = await BACKEND_CLIENT.get<GeneralResponse<Gallery[]>>(`/gallery`, { params })
  return data as any
}

export async function getGallerySubordinateArtists(username: string): Promise<Gallery> {
  const { data } = await BACKEND_CLIENT.get<GeneralResponse<Gallery>>(`/user/@${username}/subordinateArtists`)
  return data as any
}

export async function createGallery(gallery: {
  name: string
  cover: string
  intro: string
  artists: User[]
  owner: User
}): Promise<GeneralResponse<Gallery>> {
  const { data } = await BACKEND_CLIENT.post<GeneralResponse<Gallery>>(`/gallery`, gallery)
  return data
}

export async function updateGallery(id: number, gallery: Gallery): Promise<GeneralResponse<Gallery>> {
  const { data } = await BACKEND_CLIENT.patch<GeneralResponse<Gallery>>(`/gallery/${id}`, gallery)
  return data
}

export async function createGalleryJoinRequest(gid: number): Promise<AxiosResponse<any>> {
  const data = await BACKEND_CLIENT.post(`/gallery/${gid}/request`)
  return data
}

export async function findGalleryJoinRequest(
  condition: Partial<{
    id: number
    artist: Partial<User>
    gallery: Partial<Gallery>
    status: Partial<GalleryJoinRequestStatus>
  }>,
): Promise<AxiosResponse<GalleryJoinRequest[]>> {
  const data = await BACKEND_CLIENT.post<GalleryJoinRequest[]>('/gallery/request/find', condition)
  return data
}

export async function updateGalleryJoinRequest(
  id: number,
  accept: boolean,
): Promise<AxiosResponse<GalleryJoinRequest[]>> {
  const data = await BACKEND_CLIENT.patch<GalleryJoinRequest[]>(`/gallery/request/${id}`, { accept })
  return data
}
