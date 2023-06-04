/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './App.scss';
import { Landing } from './pages/Landing';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About, Error, Projects, TelescopeModal } from './shared';
import {
	AdminIndex,
	ManagePost,
	Login,
	PostDetail,
	WritingResults,
} from './pages';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
		errorElement: <Error />,
	},
	{
		path: '/about',
		element: (
			<TelescopeModal>
				<About />
			</TelescopeModal>
		),
	},
	{
		path: '/projects',
		element: (
			<TelescopeModal>
				<Projects />
			</TelescopeModal>
		),
	},
	{
		path: '/writing',
		element: (
			<TelescopeModal>
				<WritingResults />
			</TelescopeModal>
		),
	},
	{
		path: '/writing/:postUid',
		element: (
			<TelescopeModal>
				<PostDetail />
			</TelescopeModal>
		),
	},
	{
		path: '/admin',
		element: <AdminIndex />,
	},
	{
		path: '/admin/login',
		element: <Login />,
	},
	{
		path: '/admin/posts/:postUid',
		element: <ManagePost />,
	},
]);

function App(): JSX.Element {
	return (
		<div className="App">
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</div>
	);
}

export default App;
