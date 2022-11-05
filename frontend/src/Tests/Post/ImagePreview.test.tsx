import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { usePost } from 'Hooks/usePost'
import { ImagePreview } from 'Templates/Post/ImagePreview'

describe('投稿画面、画像プレビュー機能動作確認', () => {
  const { file, setFile } = usePost()
  test('テスト名', () => {
    render(<ImagePreview file={file} setFile={setFile} />)
    screen.debug()
    expect(1 + 2).toBe(3)
  })
})
