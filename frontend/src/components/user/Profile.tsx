import { ButtonBase } from '@mui/material'
import DefaultUserImage from '../../images/default_user_image.jpg'
import { AccountMenu } from './AccountMenu'

export const Profile = () => {
  return (
    <>
      <section className="">
        <AccountMenu />

        <div className="flex justify-center mt-16">
          <img
            src={DefaultUserImage}
            alt="User image"
            className="w-48 rounded-full"
          />
        </div>
        <div className="max-w-screen-xl px-8 pt-6 pb-12 mx-auto sm:px-16 lg:px-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              テストユーザー
            </h2>

            <p className="mt-4 text-gray-500 sm:text-lg">
              好きな時代は、戦国時代です。
              <br />
              武田信玄が特に好きです。
            </p>
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
  )
}
