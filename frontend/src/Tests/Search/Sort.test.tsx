import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sorts } from 'Templates/Search/Sorts'
import { FetchArticleOptionsProvider } from 'Utils/FetchArticleOptionsContext'
import { SearchQueriesContextProvider } from 'Utils/SearchQueriesContext'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

describe('ソートボタンのチェックボックス動作確認', () => {
  const user = userEvent.setup()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <FetchArticleOptionsProvider>
        <SearchQueriesContextProvider>{children}</SearchQueriesContextProvider>
      </FetchArticleOptionsProvider>
    </BrowserRouter>
  )

  test('デフォルトでは最新にのみチェックが入っている', () => {
    render(<Sorts />, { wrapper })
    expect(screen.getByTestId('最新-input')).toBeChecked()
    expect(screen.getByTestId('人気-input')).not.toBeChecked()
    expect(screen.getByTestId('古い-input')).not.toBeChecked()
    expect(screen.getByTestId('新しい-input')).not.toBeChecked()
  })

  test('クリックするとチェックが移動する', async () => {
    render(<Sorts />, { wrapper })
    const button = screen.getByTestId('人気-button')
    await user.click(button)

    expect(screen.getByTestId('最新-input')).not.toBeChecked()
    expect(screen.getByTestId('人気-input')).toBeChecked()
    expect(screen.getByTestId('古い-input')).not.toBeChecked()
    expect(screen.getByTestId('新しい-input')).not.toBeChecked()
  })
})
