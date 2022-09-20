import { ButtonBase } from '@mui/material'

export const ProfileStatus = () => {
  return (
    <div className="w-full">
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
  )
}
