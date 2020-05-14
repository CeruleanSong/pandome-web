import { motion } from 'framer-motion';

import Head from '../partials/head';
import NavBar from '../partials/navbar';
import ActiveLink from '../activelink';
import { OpenGraphImages } from 'next-seo/lib/types';

import config from '../../res/config.json';

import styles from "./default.layout.module.scss"
import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { ActionGroup, AuthorizationAction, RootAction } from '../../store/_store.types';

interface Props {
	authorization?: AuthorizationState;
	logoutFunc: (e: any) => any;
	authLink?: {
		href: string,
		icon: JSX.Element,
	},
	links: NavLink[],
	headProps: HeadProp,
};

const DefaultLayout: React.FunctionComponent<Props> = (props) => {

	const dispatch = useDispatch();
	
	const logout = (event: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => {
		
		const action: RootAction = {
			group: ActionGroup.AUTHORIZATION,
			action: AuthorizationAction.LOGOUT,
		};

		dispatch({
			type: action,
		});
	};

	const navigationVariants = {
		initial: { opacity: 0, y: '100vw' },
		enter: { opacity: 1, y: '0vw', transition: { duration: 0.4 } },
		exit: { opacity: 0, y: '100vw', transition: { duration: 0.6 } },
	}
	
	return (
		<div id="body" className={`${styles.body} text-center display-flex center`}>
			
			<Head {...props.headProps} />

			<div id="navbar" className={`${styles.navbar}`}>
				<h1 className={styles.title}>
					<ActiveLink href="/">
						{config.title}
					</ActiveLink>
				</h1>
				<NavBar
				authorization={props.authorization}
				logoutFunc={props.logoutFunc}
				links={props.links}
				authLink={props.authLink} />
			</div>

			<motion.div initial="initial" animate="enter" exit="exit" 
			variants={navigationVariants} className={`${styles.motion}`}>
				<div  id="masthead" className={`${styles.masthead} container`} >
					{ props.children }
				</div>
			</motion.div>

			<footer>
			{/* <small>With&nbsp;<i className="fas fa-sm fa-heart color-red"></i>&nbsp;from Elias Mawa</small> */}
			{/* <small><a href="javascript:void(0)" id="theme">lights off!</a></small> */}
			</footer>
		</div>
	);
};

export default DefaultLayout;