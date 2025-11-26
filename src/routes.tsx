import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/authentication/login/page'
import PublicRouter from './components/PublicRouter'
import PrivateRouter from './components/PrivateRouter'
import ChangePassPage from './pages/authentication/change-password/page'
import ForgotPassPage from './pages/authentication/forgot-password/page'
import ResetPassPage from './pages/authentication/reset-password/page'
import Dashboard from './pages/home/home'

import UserInfoPage from './pages/user-info/page'
import RegisterPage from './pages/register/page'
const routes = createBrowserRouter([
	{
		path: '/login',
		element: (
			<PublicRouter>
				<LoginPage />
			</PublicRouter>
		)
	},
	{
		path: '/forgot-password',
		element: <ForgotPassPage />
	},
	{
		path: '/reset-password',
		element: <ResetPassPage />
	},

	{
		path: '/change-password',
		element: (
			<PrivateRouter>
				<ChangePassPage />
			</PrivateRouter>
		)
	},
	{
		path: '/',
		element: (
			<PrivateRouter>
				<Dashboard />
			</PrivateRouter>
		)
	},
	{
		path: '/user-info',
		element: (
			<PrivateRouter>
				<UserInfoPage />
			</PrivateRouter>
		)
	},
	{
		path: '/register',
		element: <RegisterPage></RegisterPage>
	}
])
export default routes
