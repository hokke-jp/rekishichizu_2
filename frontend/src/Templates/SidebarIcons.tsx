import CreateAccount from 'Images/create_account.svg'
import EasyLogin from 'Images/easy_login.svg'
import Login from 'Images/login.svg'
import { EasyLoginWrapper } from 'Parts/EasyLoginWrapper'
import { IconWrapper } from 'Parts/IconWrapper'

export const SidebarIcons = () => {
  return (
    <>
      <EasyLoginWrapper>
        <img src={EasyLogin} alt="Easy Login icon" className="h-6 w-6" />
      </EasyLoginWrapper>
      <IconWrapper path="login" tooltip="ログイン">
        <img src={Login} alt="Login icon" className="h-6 w-6" />
      </IconWrapper>
      <IconWrapper path="createAccount" tooltip="アカウント作成">
        <img src={CreateAccount} alt="Signup icon" className="h-6 w-6" />
      </IconWrapper>
    </>
  )
}
