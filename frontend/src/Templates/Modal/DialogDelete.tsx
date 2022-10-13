import { Delete } from '@mui/icons-material'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@mui/material'
import { useArticle } from 'Hooks/useArticle'
import { ProfileMenuItem } from 'Templates/Profile/ProfileMenuItem'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { Article, User } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { getTokens } from 'Utils/handleCookie'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
  article: Article
}

export const DialogDelete = ({ setAnchorEl, article }: Props) => {
  const [open, setOpen] = useState(false)
  const { setAlertSeverity, setAlertMessage } = useAlertMessageContext()
  const { setCurrentUser } = useCurrentUserContext()
  const { setOpenModalId } = useArticlesContext()
  const { deleteArticleFromList } = useArticle()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }
  const handleDelete = () => {
    const tokens = getTokens()
    axiosInstance
      .delete(`/articles/${article.id}`, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        const articleIds = response.data.article_ids
        setCurrentUser((prevState: User | undefined) => ({ ...prevState, article_ids: articleIds } as User))
        sessionStorage.setItem('article_ids', articleIds)
        deleteArticleFromList(article.id)
        setOpenModalId(undefined)
        setAlertSeverity('success')
        setAlertMessage('削除しました')
      })
      .catch((error) => {
        console.error(error)
        const message = error.response.data.errors?.full_messages || '削除に失敗しました'
        setAlertSeverity('warning')
        setAlertMessage(message)
      })
    setOpen(false)
    setAnchorEl(null)
  }

  return (
    <>
      <ProfileMenuItem handleFunction={handleOpen} icon={<Delete fontSize="small" />} text="削除" />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'削除実行の確認'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            この記事を削除します。この操作は取り消せません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            キャンセル
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
