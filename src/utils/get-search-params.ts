import { NextRequest } from "next/server"

export const getSearchParams = (params: string, request: NextRequest) => {
  if (params === "search") {
    return request.nextUrl.searchParams.get(params)?.replace(/-/g, " ")
  }

  return request.nextUrl.searchParams.get(params)
}
