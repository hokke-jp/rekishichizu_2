export interface User {
  id: number | undefined
  name: string | undefined
  introduction: string | undefined
  avatar_url: string | undefined
  liking_article_ids: number[] | undefined
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
  period_id: number
  prefecture_id: number
  user: {
    name: string
    avatar_url: string | undefined
  }
  liked_user_ids: number[]
}
