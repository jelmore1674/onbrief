import {
	Button,
	Container,
	Loading,
	Modal,
	Row,
	Text,
} from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';

export const UpdateModal = ({
	open,
	onClose,
	header,
	body,
	action,
	isInstalling,
}) => {
	console.log({ header, body });

	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header>
				<Text b h3>
					Whats new in {header}?
				</Text>
			</Modal.Header>
			<Modal.Body>
				{isInstalling ? (
					<Container>
						<Row justify='center' alignItems='center'>
							<Loading
								size='xl'
								css={{
									alignSelf: 'center',
									justifySelf: 'center',
								}}
							/>
						</Row>
					</Container>
				) : (
					<ReactMarkdown children={body} />
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					css={{ width: '100%' }}
					onPress={action}
					disabled={isInstalling}>
					Update
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
