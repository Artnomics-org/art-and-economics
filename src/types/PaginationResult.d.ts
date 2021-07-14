/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginationResult<T = any> {
  items: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}
