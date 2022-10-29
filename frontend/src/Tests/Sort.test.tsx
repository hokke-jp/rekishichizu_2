import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sorts } from 'Templates/Search/Sorts'
import { ArticlesProvider } from 'Utils/ArticlesContext'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

test('ソートボタンクリック時のチェックボックステスト', async () => {
  const user = userEvent.setup()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <ArticlesProvider>{children}</ArticlesProvider>
    </BrowserRouter>
  )
  render(<Sorts />, { wrapper })

  const button = screen.getByTestId('人気')
  await user.click(button)

  expect(screen.getByTestId('人気-input')).toBeChecked()
  // expect(screen.getByTestId('人気-label')).toHaveClass('bg-[#1876D3]')
})
