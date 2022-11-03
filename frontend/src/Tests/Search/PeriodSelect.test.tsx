import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PERIODS } from 'Constant/PERIOD'
import { PeriodSearch } from 'Templates/Search/PeriodSearch'
import { FetchArticleOptionsProvider } from 'Utils/FetchArticleOptionsContext'
import { SearchQueriesContextProvider } from 'Utils/SearchQueriesContext'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

describe('時代タグ検索セレクトボックス動作確認', () => {
  const PERIODS_LENGTH = PERIODS.length
  const user = userEvent.setup()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <FetchArticleOptionsProvider>
        <SearchQueriesContextProvider>{children}</SearchQueriesContextProvider>
      </FetchArticleOptionsProvider>
    </BrowserRouter>
  )

  test('デフォルトではなにも選択されていない', () => {
    const { container } = render(<PeriodSearch />, { wrapper })

    expect(container.innerHTML).toMatch('時代')
    expect(screen.queryByRole('option')).toBeNull()
  })

  test('時代を選択すると表示に反映される', async () => {
    render(<PeriodSearch />, { wrapper })
    const selectBox = screen.getByLabelText('時代')
    await user.click(selectBox)

    expect(screen.getAllByRole('option')).toHaveLength(PERIODS_LENGTH)

    const randomPeriodId = Math.floor(Math.random() * PERIODS_LENGTH)
    const randomPeriod = screen.getByText(PERIODS[randomPeriodId])
    await user.click(randomPeriod)

    expect(screen.getByTestId('selected-box')).toHaveTextContent(PERIODS[randomPeriodId])
    expect(screen.getByRole('listbox').querySelector('li[aria-selected=true]')).toHaveTextContent(
      PERIODS[randomPeriodId]
    )
  })

  test('時代を複数選択するとソートされて表示される', async () => {
    render(<PeriodSearch />, { wrapper })
    const selectBox = screen.getByLabelText('時代')
    await user.click(selectBox)
    // 1 ~ PERIODS_LENGTH までの計(PERIDOS_LENGTH - 1)個のrandom整数. 0を含まないのは次にrandom整数-1をした値がほしいので,0を含めるとarray[-1]でundefinedとなるため
    const randomPeriodId = Math.floor(Math.random() * (PERIODS_LENGTH - 1) + 1)
    const randomPeriod = screen.getByText(PERIODS[randomPeriodId])
    await user.click(randomPeriod)
    const prevRandomPeriod = screen.getByText(PERIODS[randomPeriodId - 1])
    await user.click(prevRandomPeriod)

    expect(screen.getByTestId('selected-box')).toHaveTextContent(PERIODS[randomPeriodId])
    expect(screen.getByTestId('selected-box')).toHaveTextContent(PERIODS[randomPeriodId - 1])
    expect(screen.getByDisplayValue(`${PERIODS[randomPeriodId - 1]},${PERIODS[randomPeriodId]}`)).toBeInTheDocument()
  })

  test('タグ削除ボタンを押すと削除される', async () => {
    render(<PeriodSearch />, { wrapper })
    const selectBox = screen.getByLabelText('時代')
    await user.click(selectBox)
    const randomPeriodId = Math.floor(Math.random() * (PERIODS_LENGTH - 1) + 1)
    const randomPeriod = screen.getByText(PERIODS[randomPeriodId])
    await user.click(randomPeriod)
    const prevRandomPeriod = screen.getByText(PERIODS[randomPeriodId - 1])
    await user.click(prevRandomPeriod)
    const cancelIcon = screen.getAllByTestId('CancelIcon')[0]
    screen.debug(cancelIcon)
    await user.click(cancelIcon)

    expect(screen.getByTestId('selected-box')).toHaveTextContent(PERIODS[randomPeriodId])
    expect(screen.getByTestId('selected-box')).not.toHaveTextContent(PERIODS[randomPeriodId - 1])
    expect(screen.getByDisplayValue(`${PERIODS[randomPeriodId]}`)).toBeInTheDocument()
  })
})
