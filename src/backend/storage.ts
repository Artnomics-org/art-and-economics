/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { MediaData } from '../types/Media'
import client from './client'

// 上传媒体
export function storageUploadToIpfs(): Promise<AxiosResponse<any>> {
  return client.put('storage/uploadToIpfs')
}

type UploadFileResponse = {
  data?: {
    url: string
  }
  code: number
}
export function uploadFile(file: File): Promise<AxiosResponse<UploadFileResponse>> {
  const formData = new FormData()
  formData.append('file', file)
  return client.put<UploadFileResponse>('storage/uploadFile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

type UploadFileToIpfsResponse = {
  data?: {
    MediaData: MediaData
  }
  code: number
}
export type UploadFileToIpfsParams = {
  file: File
  name: string
  description: string
}
export function uploadFileToIpfs(param: UploadFileToIpfsParams): Promise<AxiosResponse<UploadFileToIpfsResponse>> {
  const { file, name, description } = param
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', name)
  formData.append('description', description)
  return client.put<UploadFileToIpfsResponse>('storage/uploadToIpfs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

// 上传媒体 提供组件 action 使用
export const storageUploadToIpfsUrl = `${process.env.REACT_APP_BACKEND_API}/storage/uploadToIpfs`
export const storageUploadFile = `${process.env.REACT_APP_BACKEND_API}/storage/uploadFile`
