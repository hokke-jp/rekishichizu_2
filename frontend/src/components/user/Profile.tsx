import { axiosInstance } from '../../Utils/axios'
import { Notfound } from '../Notfound'
import { getToken } from '../session/getToken'
import { AccountMenu } from './AccountMenu'
import { Avatar } from './Avatar'
import { CurrentUserContext, User } from './CurrentUserContext'
import { AddPhotoAlternateOutlined, Edit } from '@mui/icons-material'
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  TextField,
  Tooltip
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Profile = () => {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const { currentUser } = useContext(CurrentUserContext)
  const [isLoading, setIsLoading] = useState(true)
  const { setCurrentUser } = useContext(CurrentUserContext)
  useEffect(() => {
    ;(async () => {
      await axiosInstance
        .get(`/users/${params.userName}`, {})
        .then((response) => {
          setUser(response.data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setIsLoading(false)
        })
    })()
  }, [params.userName])
  const isMypage = currentUser?.name === user?.name

  const handleChange = (e: { target: HTMLInputElement | null }) => {
    const target = e.target
    const tokens = getToken()
    if (target === null || target.files === null) return
    const sizeInMegabytes = target.files[0].size / 1024 / 1024
    if (sizeInMegabytes > 2) {
      alert('2MB以下のファイルを選択してください。')
      return
    }
    const params = new FormData()
    params.append('avatar', target.files[0])
    axiosInstance
      .patch('/auth', params, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        setCurrentUser(response.data)
      })
      .catch((error) => {
        console.error(error.response.data)
      })
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <CircularProgress size={68} />
        </div>
      ) : (
        <>
          {user ? (
            <>
              <section className="pt-16">
                {isMypage && <AccountMenu />}

                <div className="flex justify-center">
                  {isMypage ? (
                    <>
                      <input
                        type="file"
                        id="file"
                        accept="image/jpeg,image/png"
                        onChange={handleChange}
                        hidden
                      />
                      <label
                        htmlFor="file"
                        className="avatar-wrapper relative h-48 w-48 rounded-full overflow-hidden"
                      >
                        <Avatar
                          url={currentUser?.avatar_url}
                          className="h-48 w-48"
                        />
                        <div className="absolute bottom-0 flex justify-center items-center  w-48 h-12 bg-neutral-900 opacity-0">
                          <AddPhotoAlternateOutlined
                            color="action"
                            sx={{ fontSize: 40, color: 'white' }}
                          />
                        </div>
                      </label>
                    </>
                  ) : (
                    <Avatar
                      url={user?.avatar_url}
                      className="h-48 w-48 rounded-full"
                    />
                  )}
                </div>
                <div className="max-w-screen-xl px-8 pt-6 pb-12 mx-auto sm:px-16 lg:px-24">
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {isMypage ? <EditName name={user?.name} /> : user?.name}
                    </h2>

                    <div className="mt-4 text-gray-500 sm:text-lg whitespace-pre-wrap break-all">
                      {isMypage ? (
                        <EditIntroduction
                          introduction={currentUser?.introduction}
                        />
                      ) : (
                        user?.introduction || 'コメントが設定されていません'
                      )}
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12">
                    <dl className="grid grid-cols-1 gap-16 sm:grid-cols-3">
                      <ButtonBase style={{ display: 'block' }}>
                        <div className="flex flex-col px-4 py-8 bg-gray-100 text-center rounded-lg hover:opacity-80">
                          <dt className="order-last text-lg font-medium text-gray-500">
                            投稿数
                          </dt>

                          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                            4
                          </dd>
                        </div>
                      </ButtonBase>

                      <ButtonBase style={{ display: 'block' }}>
                        <div className="flex flex-col px-4 py-8 bg-gray-100 text-center rounded-lg hover:opacity-80">
                          <dt className="order-last text-lg font-medium text-gray-500">
                            「イイね」した記事
                          </dt>

                          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                            24
                          </dd>
                        </div>
                      </ButtonBase>

                      <ButtonBase style={{ display: 'block' }}>
                        <div className="flex flex-col px-4 py-8 bg-gray-100 text-center rounded-lg hover:opacity-80">
                          <dt className="order-last text-lg font-medium text-gray-500">
                            フォロー中
                          </dt>

                          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                            8
                          </dd>
                        </div>
                      </ButtonBase>
                    </dl>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <Notfound />
          )}
        </>
      )}
    </>
  )
}

const EditIntroduction = ({
  introduction
}: {
  introduction: string | null | undefined
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const [newIntroduction, setNewIntroduction] = useState(introduction)
  const handleEdit = () => {
    setIsFocus(true)
  }
  const { setCurrentUser } = useContext(CurrentUserContext)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const tokens = getToken()
    const data = new FormData(e.currentTarget)
    ;(async () => {
      return await axiosInstance
        .patch(
          '/auth',
          { introduction: data.get('introduction') },
          {
            headers: {
              'Content-Type': 'application/json',
              ...tokens
            }
          }
        )
        .then((response) => {
          setCurrentUser(response.data)
        })
        .catch((error) => {
          console.error(error.response.data)
        })
    })()
    setIsFocus(false)
  }
  return (
    <>
      {isFocus ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="introduction"
            type="text"
            variant="outlined"
            name="introduction"
            value={newIntroduction || ''}
            autoFocus
            multiline
            rows={4}
            margin="none"
            fullWidth
            onChange={(e) => setNewIntroduction(e.target.value)}
          />
          <Grid container spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
            <Grid item>
              <Button onClick={() => setIsFocus(false)}>キャンセル</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                更新
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Tooltip
          title={<Edit onClick={handleEdit} fontSize="small" />}
          placement="right"
        >
          <div onDoubleClick={handleEdit} className="inline-block">
            {introduction || 'コメントが設定されていません'}
          </div>
        </Tooltip>
      )}
    </>
  )
}
const EditName = ({ name }: { name: string }) => {
  const [isFocus, setIsFocus] = useState(false)
  const [newName, setNewName] = useState(name)
  const handleEdit = () => {
    setIsFocus(true)
  }
  const navigate = useNavigate()
  const { setCurrentUser } = useContext(CurrentUserContext)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const tokens = getToken()
    const data = new FormData(e.currentTarget)
    ;(async () => {
      return await axiosInstance
        .patch(
          '/auth',
          { name: data.get('name') },
          {
            headers: {
              'Content-Type': 'application/json',
              ...tokens
            }
          }
        )
        .then((response) => {
          setCurrentUser(response.data)
          navigate(`/${data.get('name')}`)
        })
        .catch((error) => {
          console.error(error.response.data)
        })
    })()
    setIsFocus(false)
  }
  return (
    <>
      {isFocus ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="name"
            type="text"
            variant="standard"
            name="name"
            value={newName}
            autoFocus
            autoComplete="name"
            margin="none"
            sx={{ width: '320px' }}
            inputProps={{ style: { fontSize: 24 } }}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button onClick={() => setIsFocus(false)}>キャンセル</Button>
          <Button variant="contained" type="submit">
            更新
          </Button>
        </Box>
      ) : (
        <Tooltip
          title={<Edit onClick={handleEdit} fontSize="small" />}
          placement="right"
        >
          <div onDoubleClick={handleEdit} className="inline-block">
            {name}
          </div>
        </Tooltip>
      )}
    </>
  )
}
