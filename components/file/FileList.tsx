import { List, Text } from '@chakra-ui/react'
import { FileListItem } from './FileListItem'

interface props {
	placeholder?: string;
	history?: HistoryState;
	hostname: string;
}

export const FileList: React.FunctionComponent<props> = (props) => {
	
	let files: JSX.Element[] | null = null;
	if(props.history && props.history.history.length > 0
		&& props.history.history[0]) {
		files = props.history?.history.map(e => {
			return (
				<FileListItem
				key={
					e.file_id ? e.file_id : e.initiated! as any
				}
				filedata={e}
				hostname={props.hostname}/> 
			);
		});
		files.reverse();
	}
	
	return (
		<List border="1px" borderColor="gray.200"
			borderStyle="dashed" rounded="md"
			margin="2rem" padding="1rem" spacing={4}
			width="100%">
				
			{ files ? files : <Text align="center"> {props.placeholder} </Text>}
		</List>
	)
}

FileList.defaultProps = {
	placeholder: "Drag and drop to start uploading... ",
}