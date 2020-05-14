import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import DragDropLayout from '../components/layouts/dragdrop.layout';

import { parseCookies } from 'nookies'
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle,
	FaUserCircle, FaLock, FaEyeSlash, FaCloudUploadAlt, FaSearch, FaQuestion, FaUserAlt } from 'react-icons/fa';

import { RootAction, ActionGroup,
	UploadHistoryAction, 
	AuthorizationAction} from '../store/_store.types';
import config from '../res/config.json';

import styles from './index.module.scss';
import DefaultLayout from '../components/layouts/default.layout';
import { SyntheticEvent } from 'react';

const Page: NextPage<RootState> = (props) => {

	const dispatch = useDispatch();
	
	const authorization
		= useSelector((state: RootState) => state.authorization);

	const authLink: NavLink = {
		href: "/",
		icon: <FaSignOutAlt />,
	};
	
	const links: NavLink[] = [{
		key: 0,
		href: "/",
		icon: <FaCloudUploadAlt />,
	},{
		key: 1,
		href: "/search",
		icon: <FaSearch />,
	},{
		key: 2,
		href: "/faq",
		icon: <FaQuestion />,
	},{
		key: 3,
		href: "/dashboard",
		icon: <FaUserAlt />,
	}];

	const headProps: HeadProp = {
		title: config.title,
		description: config.description,
		url: config.url,
		ogTitle: config.title,
		ogDescription: config.description,
		ogUrl: config.url,
		ogSiteName: config.og.site,
		twSite: config.tw.site,
	};

	const logout = (event: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => {
		
		const action: RootAction = {
			group: ActionGroup.AUTHORIZATION,
			action: AuthorizationAction.LOGOUT,
		};

		dispatch({
			type: action,
		});
	};
	return (
		<DefaultLayout
		authorization={authorization}
		logoutFunc={logout}
		authLink={authLink} links={links}
		headProps={headProps}>

		coming soon™️

		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = (ctx) => {

	const rootState: RootState = ctx.store.getState();
	const initialProps: RootState = rootState;

	return initialProps;
};


export default Page;