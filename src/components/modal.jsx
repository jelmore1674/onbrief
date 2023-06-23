import { Button, Input, Modal, Spacer, Text } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/slices/modal';
import { useState } from 'react';

export const IcaoModal = ({ icao, setIcao, newIcao, update, saveIcao }) => {
	const { showModal } = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const handleClose = () => {
		setIcao('');
		dispatch(closeModal());
	};
	return (
		<Modal
			aria-labelledby='modal-title'
			open={showModal}
			onClose={handleClose}>
			<Modal.Header>
				<Text h2>Enter Plane ICAO</Text>
			</Modal.Header>
			<Modal.Body>
				<Text h3>{newIcao}</Text>
				<Spacer y={0.5} />
				<Input
					underlined
					labelPlaceholder='Plane ICAO (ex. B738, A32N, B350)'
					initialValue={icao}
					onChange={(e) => setIcao(e.target.value)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onPress={() => saveIcao()}>
					<Text>Save ICAO</Text>
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
