import { useDispatch, useSelector } from 'react-redux';
import {
	Container,
	Loading,
	Row,
	Card,
	Pagination,
	Text,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Leg } from './components/legs';
import { paginate } from './utils';
import { FaCog } from 'react-icons/fa';
import { IcaoModal } from '../../components/modal';
import { updateAircraftIcao } from '../../store/slices/aircraftData';
import { closeModal } from '../../store/slices/modal';
import { useHref } from 'react-router-dom';
import routes from '../../routes';

// TODO: fix prop drilling
export const Jobs = () => {
	const path = useHref();
	const { jobs, vaJobs, loading, error } = useSelector((state) => state.jobs);
	const { world } = useSelector((state) => state.world);
	const [page, setPage] = useState(1);
	const [icao, setIcao] = useState('');
	const [selectedIcao, setSelectedIcao] = useState('');
	const [newIcao, setNewIcao] = useState('');
	const dispatch = useDispatch();
	const [paginatedJobs, setPaginatedJobs] = useState(null);

	useEffect(() => {
		if (path === routes.HOME) {
			setPaginatedJobs(paginate(jobs, 10, page));
		}

		if (path === routes.VA_JOBS) {
			setPaginatedJobs(paginate(vaJobs, 10, page));
		}
	}, [jobs, vaJobs, page, path, world]);

	const handlePagination = async (selectedPage) => {
		setPaginatedJobs(null);
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setPage(selectedPage);
		}, 800);
	};

	const saveIcao = () => {
		dispatch(updateAircraftIcao({ [newIcao]: icao }));
		setSelectedIcao(icao);
		dispatch(closeModal());
		setIcao('');
		setNewIcao('');
	};

	if (path === routes.HOME && jobs.length === 0 && !loading) {
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
								<Card
									key={job.id}
									css={{
										marginBlock: 32,
										border:
											path === routes.VA_JOBS &&
											'1px solid $success',
									}}>
									<Card.Header>
										{job.missionType} |{' '}
										{`${job.legs[0]?.departureAirport}-${job.legs[0]?.arrivalAirport}`}
									</Card.Header>
									<Card.Body>
										{job.legs.map((leg, i) => (
											<Leg
												newIcao={newIcao}
												setNewIcao={setNewIcao}
												leg={leg}
												key={i}
												setSelectedIcao={
													setSelectedIcao
												}
												selectedIcao={selectedIcao}
											/>
										))}
									</Card.Body>
								</Card>
							)}
						</>
					))}
					{jobs.length > 9 && (
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
			<IcaoModal
				update
				newIcao={newIcao}
				setNewIcao={setNewIcao}
				icao={icao}
				setIcao={setIcao}
				saveIcao={saveIcao}
				setSelectedIcao={setSelectedIcao}
				selectedIcao={selectedIcao}
			/>
		</Container>
	);
};
