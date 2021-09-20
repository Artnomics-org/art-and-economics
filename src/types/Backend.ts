// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GeneralResponse<T = Record<string, any>> {
  code: number
  data: T
  message?: string
}

export interface PaginationProps {
  page: number
  limit: number
}
