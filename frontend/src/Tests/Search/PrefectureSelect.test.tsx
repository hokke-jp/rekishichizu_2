import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { PrefectureSearch } from 'Templates/Search/PrefectureSearch'
import { FetchArticleOptionsProvider } from 'Utils/FetchArticleOptionsContext'
import { SearchQueriesContextProvider } from 'Utils/SearchQueriesContext'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

describe('都道府県タグ検索セレクトボックス動作確認', () => {
  const PREFECTURES_LENGTH = PREFECTURES.length
  const user = userEvent.setup()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <FetchArticleOptionsProvider>
        <SearchQueriesContextProvider>{children}</SearchQueriesContextProvider>
      </FetchArticleOptionsProvider>
    </BrowserRouter>
  )

  test('デフォルトではなにも選択されていない', () => {
    const { container } = render(<PrefectureSearch />, { wrapper })

    expect(container.innerHTML).toMatch('都道府県')
    expect(screen.queryByRole('option')).toBeNull()
  })

  test('都道府県を選択すると表示に反映される', async () => {
    render(<PrefectureSearch />, { wrapper })
    const selectBox = screen.getByLabelText('都道府県')
    await user.click(selectBox)

    expect(screen.getAllByRole('option')).toHaveLength(PREFECTURES_LENGTH)

    const randomPeriodId = Math.floor(Math.random() * PREFECTURES_LENGTH)
    const randomPeriod = screen.getByText(PREFECTURES[randomPeriodId])
    await user.click(randomPeriod)

    expect(screen.getByTestId('prefecture-selected-box')).toHaveTextContent(PREFECTURES[randomPeriodId])
    expect(screen.getByRole('listbox').querySelector('li[aria-selected=true]')).toHaveTextContent(
      PREFECTURES[randomPeriodId]
    )
  })

  test('都道府県を複数選択するとソートされて表示される', async () => {
    render(<PrefectureSearch />, { wrapper })
    const selectBox = screen.getByLabelText('都道府県')
    await user.click(selectBox)
    // 1 ~ PREFECTURES_LENGTH までの計(PERIDOS_LENGTH - 1)個のrandom整数. 0を含まないのは次にrandom整数-1をした値がほしいので,0を含めるとarray[-1]でundefinedとなるため
    const randomPeriodId = Math.floor(Math.random() * (PREFECTURES_LENGTH - 1) + 1)
    const randomPeriod = screen.getByText(PREFECTURES[randomPeriodId])
    await user.click(randomPeriod)
    const prevRandomPeriod = screen.getByText(PREFECTURES[randomPeriodId - 1])
    await user.click(prevRandomPeriod)

    expect(screen.getByTestId('prefecture-selected-box')).toHaveTextContent(PREFECTURES[randomPeriodId])
    expect(screen.getByTestId('prefecture-selected-box')).toHaveTextContent(PREFECTURES[randomPeriodId - 1])
    expect(
      screen.getByDisplayValue(`${PREFECTURES[randomPeriodId - 1]},${PREFECTURES[randomPeriodId]}`)
    ).toBeInTheDocument()
  })

  test('タグ削除ボタンを押すと削除される', async () => {
    render(<PrefectureSearch />, { wrapper })
    const selectBox = screen.getByLabelText('都道府県')
    await user.click(selectBox)
    const randomPeriodId = Math.floor(Math.random() * (PREFECTURES_LENGTH - 1) + 1)
    const randomPeriod = screen.getByText(PREFECTURES[randomPeriodId])
    await user.click(randomPeriod)
    const prevRandomPeriod = screen.getByText(PREFECTURES[randomPeriodId - 1])
    await user.click(prevRandomPeriod)
    const cancelIcon = screen.getAllByTestId('CancelIcon')[0]
    await user.click(cancelIcon)

    expect(screen.getByTestId('prefecture-selected-box')).toHaveTextContent(PREFECTURES[randomPeriodId])
    expect(screen.getByTestId('prefecture-selected-box')).not.toHaveTextContent(PREFECTURES[randomPeriodId - 1])
    expect(screen.getByDisplayValue(`${PREFECTURES[randomPeriodId]}`)).toBeInTheDocument()
  })
})
