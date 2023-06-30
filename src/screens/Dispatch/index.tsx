import { Button, Container, Loading, Row, Spacer } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearOFP, fetchOFP } from '../../store/slices/simbrief';

export const Dispatch = () => {
	const dispatch = useAppDispatch();

	const { ofp, username, loading } = useAppSelector(
		(state) => state.simbrief
	);

	async function handleFetchFlightPlan() {
		if (username) {
			await dispatch(fetchOFP());
		}
	}

	function clearFlightPlan() {
		dispatch(clearOFP());
	}
	return (
		<Container>
			<Row justify='space-between'>
				<Button
					disabled={loading}
					color='success'
					onPress={handleFetchFlightPlan}>
					Get Latest Flight Plan
				</Button>
				<Button
					disabled={loading}
					color='error'
					onPress={clearFlightPlan}>
					Clear Flight Plan
				</Button>
			</Row>
			<Spacer x={8} />
			{loading ? (
				<Container>
					<Spacer x={32} />
					<Row justify='center' align='center'>
						<Loading
							size='xl'
							css={{ alignSelf: 'center', justifySelf: 'center' }}
						/>
					</Row>
				</Container>
			) : (
				<div dangerouslySetInnerHTML={{ __html: ofp }} />
			)}
		</Container>
	);
};
