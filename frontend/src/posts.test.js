import { unmountComponentAtNode } from 'react-dom'

// import { createRoot } from 'react-dom/client';
// import { act } from "react-dom/test-utils";

// import { Posts } from "./component/posts";

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('投稿が表示される', () => {
  expect(1 + 2).toBe(3)
})
