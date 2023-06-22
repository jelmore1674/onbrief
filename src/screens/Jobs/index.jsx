import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../store/slices/jobs';
import {
	Container,
	Loading,
	Row,
	Card,
	Pagination,
	Text,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Leg } from '../../components/legs';
import { paginate } from './utils';
import { FaCog } from 'react-icons/fa';

export const Jobs = () => {
	const { jobs, loading, error } = useSelector((state) => state.jobs);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const [paginatedJobs, setPaginatedJobs] = useState(null);

	useEffect(() => {
		setPaginatedJobs(paginate(jobs, 10, page));
	}, [jobs, page]);

	const handlePagination = async (selectedPage) => {
		setPaginatedJobs(null);
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setPage(selectedPage);
		}, 800);
	};

	if (jobs.length === 0 && !loading) {
		return (
			<Container
				justify='center'
				alignItems='center'
				css={{ marginBlock: 16 }}>
				<Row justify='center'>
					<Text h1>Welcome to OnBrief</Text>
				</Row>
				<Row>
					<Text b>
						To get started click on the <FaCog /> Icon and enter
						your apiKey and your company-id.
					</Text>
				</Row>
			</Container>
		);
	}
	const acdata = {
		maxpax: 123,
		maxcargo: 944883,
		paxwgt: 190,
		bagwgt: 0,
	};
	return (
		<Container
			justify='center'
			alignItems='center'
			css={{ marginBlock: 16 }}>
			{!paginatedJobs || loading ? (
				<Row justify='center' alignItems='center'>
					<Loading
						size='xl'
						css={{ alignSelf: 'center', justifySelf: 'center' }}
					/>
				</Row>
			) : (
				<>
					{paginatedJobs?.map((job) => (
						<>
							{job.legs.length !== 0 && (
								<Card key={job} css={{ marginBlock: 32 }}>
									<Card.Header>
										{job.missionType} |{' '}
										{`${job.legs[0]?.departureAirport}-${job.legs[0]?.arrivalAirport}`}
									</Card.Header>
									<Card.Body>
										{job.legs.map((leg, i) => (
											<Leg
												leg={leg}
												key={i}
												acdata={acdata}
											/>
										))}
									</Card.Body>
								</Card>
							)}
						</>
					))}
					{jobs.length > 0 && (
						<Row justify='center'>
							<Pagination
								initialPage={page}
								total={jobs.length / 10}
								onChange={(page) => handlePagination(page)}
							/>
						</Row>
					)}
				</>
			)}
		</Container>
	);
};
