import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../store/slices/jobs';
import { Container, Loading, Row, Card } from '@nextui-org/react';
import { useEffect } from 'react';
import { Leg } from '../../components/legs';

export const Jobs = () => {
	const { jobs, loading, error } = useSelector((state) => state.jobs);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchJobs()).then((data) => {});
	}, []);

	if (!jobs && !loading) {
		return <></>;
	}
	const acdata = {
		maxpax: 123,
		maxcargo: 944883,
		paxwgt: 190,
		bagwgt: 0,
	};
	return (
		<Container justify='center' alignItems='center'>
			{!jobs && loading ? (
				<Row justify='center' alignItems='center'>
					<Loading
						size='xl'
						css={{ alignSelf: 'center', justifySelf: 'center' }}
					/>
				</Row>
			) : (
				<>
					{jobs?.map((job) => (
						<Card key={job} css={{ marginBlock: 32 }}>
							<Card.Header>
								{job.missionType} |{' '}
								{job?.legs &&
									`${job.legs[0].departureAirport}-${job.legs[0].arrivalAirport}`}
							</Card.Header>
							<Card.Body>
								{job?.legs &&
									job?.legs.map((leg, i) => (
										<Leg
											leg={leg}
											key={i}
											acdata={acdata}
										/>
									))}
							</Card.Body>
						</Card>
					))}
				</>
			)}
		</Container>
	);
};
