// const [query, setQuery] = useState();
// async function fetchData() {
// 	const data = '';
// 	// const data = await getData();
// 	return data;
// }

// useEffect(() => {
// 	const data = fetchData();
// 	setQuery(data);
// });

// if (query) {
// 	const { job, jobs, fleet } = query;
// 	return (
// 		<div>
// 			<div>
// 				<a
// 					href={`https://dispatch.simbrief.com/options/custom?airline=ABC&fltnum=1234&type=B77F&orig=${
// 						job.departureAirport
// 					}&dest=${job.arrivalAirport}&cargo=${
// 						job.cargo / 1000
// 					}&pax=${job.pax}`}
// 					target='_blank'>
// 					<img src='http://www.simbrief.com/previews/sblogo_small.png' />
// 				</a>
// 			</div>
// 			{jobs?.map((job) => (
// 				<div key={job}>
// 					<h2>
// 						{job.missionType} |{' '}
// 						{job?.legs &&
// 							`${job.legs[0].departureAirport}-${job.legs[0].arrivalAirport}`}
// 					</h2>
// 					<div>
// 						{job?.legs &&
// 							job?.legs.map((leg, i) => (
// 								<Leg leg={leg} key={i} acdata={acdata} />
// 							))}
// 					</div>
// 				</div>
// 			))}
// 		</div>
// 	);
// }
