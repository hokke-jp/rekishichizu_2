export interface Article {
  title: string
  content: string | undefined
  lat: number
  lng: number
  image_url: string
  user_id: number
  period_id: number
  prefecture_id: number
  user: {
    name: string
    avatar_url: string | undefined
  }
}
