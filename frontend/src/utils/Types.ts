export interface User {
  id: number
  name: string
  introduction: string | undefined
  avatar_url: string | undefined
  article_ids: number[] | undefined
  liking_article_ids: number[] | undefined
  following_ids: number[] | undefined
}

export interface UserInList {
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
  user: {
    name: string
    avatar_url: string | undefined
  }
  period_id: number
  prefecture_id: number
  liked_user_ids: number[]
}
