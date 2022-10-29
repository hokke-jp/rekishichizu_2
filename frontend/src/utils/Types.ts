export interface User {
  id: number
  name: string
  introduction: string | undefined
  avatar_url: string | undefined
  article_ids: number[] | undefined
  liking_article_ids: number[] | undefined
  following_ids: number[] | undefined
}

export interface UserInfoInArticle {
  id: number
  name: string
  avatar_url: string | undefined
}

export interface Article {
  id: number
  title: string
  content: string | undefined
  lat: number
  lng: number
  image_url: string
  created_time: number
  user_id: number
  user: UserInfoInArticle
  period_id: number
  prefecture_id: number
  liked_user_ids: number[]
}

export type SortBy = 'created_at DESC' | 'likes_count DESC' | 'period_id DESC' | 'period_id ASC'

export interface SearchQueries {
  words: string
  period_ids: string
  prefecture_ids: string
  sort_by: SortBy
}
