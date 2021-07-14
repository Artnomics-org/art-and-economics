/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import client from './client'

// 上传媒体
export function storageUploadToIpfs(): Promise<AxiosResponse<any>> {
  return client.put('storage/uploadToIpfs')
}
// 上传媒体 提供组件 action 使用
export const storageUploadToIpfsUrl = `${process.env.REACT_APP_BACKEND_API}/storage/uploadToIpfs`
export const storageUploadFile = `${process.env.REACT_APP_BACKEND_API}/storage/uploadFile`
