import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

interface Post {
  id: number
  created_at: Date
  updated_at: Date
  title: string
  content: string
}

const MyCard = ({
  title,
  content,
  createdAt
}: {
  title: string
  content: string
  createdAt: string
}) => {
  return (
    <CardContent className="">
      <div className="flex justify-center items-center">
        <Typography
          className="pr-8"
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          タイトル :
        </Typography>
        <Typography className="" variant="h5" component="div">
          {title}
        </Typography>
      </div>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {content}
      </Typography>
      <Typography variant="body2">{createdAt}</Typography>
    </CardContent>
  )
}

export const OutlinedCard = ({ posts }: { posts: Post[] }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <ul>
        {posts?.map((post: Post, index: number) => {
          return (
            <li key={index}>
              <Card
                className="inline-block my-6 min-w-[600px]"
                variant="outlined"
              >
                <MyCard
                  title={post.title}
                  content={post.content}
                  createdAt={post.created_at.toString()}
                />
              </Card>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}
