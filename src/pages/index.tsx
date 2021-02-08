import { NextPage } from 'next'

import { Container } from '../components/Container'
import { Hero } from '../components/Hero'
import { UploadTool } from '../components/UploadTool'
import { Main } from '../components/Main'
import { FileList } from '../components/FileList'
import { Layout } from '../components/Layout'

import { uploadOptionStore } from '../store/uploadoption.store';
import { authenticationStore } from '../store/authentication.store';
import { uploadHistoryStore } from '../store/uploadhistory.store';

import nookies from 'nookies';
import { useState } from 'react'
import { State } from 'zustand'

interface Props {
	authentication: AuthenticationState & State;
	uploadOption: UploadOptionState & State;
	uploadHistory: UploadHistoryState & State;
	hostname: string;
};

const Index: NextPage<Props> = (props) => {

	const [first, useFirst] = useState(false);
	if(!first) {
		authenticationStore.setState(props.authentication);
		uploadHistoryStore.setState(props.uploadHistory);
		uploadOptionStore.setState(props.uploadOption);
		!first ? useFirst(true) : void(null);
	}
	
	const state = {
		authentication: {
			...authenticationStore((state: AuthenticationState) => (state)),
		},
		uploadHistory: {
			...uploadHistoryStore((state: UploadHistoryState) => (state)),
		},
		uploadOption: {
			...uploadOptionStore((state: UploadOptionState) => (state)),
		}
	};

	return(
		<Layout authentication={state.authentication}>
			<Container direction="column" width="90vw" minHeight="40vh"
				justifyContent="flex-end" alignItems="center">
				<Hero title="pandome" hostname={props.hostname} />
				<UploadTool uploadOption={state.uploadOption}
					authentication={state.authentication}/>
			</Container>

			<Main direction="column" width="90vw"
				justifyContent="center" alignItems="center">

				<FileList uploadHistory={state.uploadHistory}
					hostname={props.hostname} />
			</Main>
		</Layout>
	)
};

Index.getInitialProps = (ctx) => {

	const cookies = nookies.get(ctx);
	const props: any = {};
	
	const authentication = cookies['authentication']
	const uploadHistory = cookies['upload-history']
	const uploadOption = cookies['upload-option']

	props.hostname = ctx.req && ctx.req.headers.host
		? ctx.req.headers.host : "";
	
	if(authentication)
		props.authentication = JSON.parse(authentication);
	if(uploadHistory)
		props.uploadHistory = JSON.parse(uploadHistory);
	if(uploadOption)
		props.uploadOption = JSON.parse(uploadOption);

	return props;
};

export default Index