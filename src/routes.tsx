import { createBrowserRouter } from 'react-router-dom'
import PrivateRouter from './components/private-router'
import PublicRouter from './components/public-router'
import RootLayout from './layouts/root-layout'
import ChangePassPage from './pages/authentication/change-password/page'
import ForgotPassPage from './pages/authentication/forgot-password/page'
import LoginPage from './pages/authentication/login/page'
import RegisterPage from './pages/authentication/register/page'
import ResetPassPage from './pages/authentication/reset-password/page'
import BookDetailPage from './pages/document/[bookId]/page'
import DocumentPage from './pages/document/page'
import ViewAllDocumentPage from './pages/document/view-all-doc/page'
import Dashboard from './pages/home/page'
import UserInfoPage from './pages/user-info/page'

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
		path: '/register',
		element: <RegisterPage />
	},
	{
		path: '/',
		element: (
			<PrivateRouter>
				<RootLayout />
			</PrivateRouter>
		),
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{
				path: '/user-info',
				element: <UserInfoPage />
			},
			{
				path: '/documents',
				element: <DocumentPage />
			},
			{
				path: '/documents/:bookId',
				element: <BookDetailPage />
			},
			{
				path: '/view-all-documents',
				element: <ViewAllDocumentPage />
			}
		]
	}
])
export default routes
