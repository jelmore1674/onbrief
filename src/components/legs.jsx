import { Container, Row } from '@nextui-org/react';
import { useState } from 'react';

export const Leg = ({ leg, acdata }) => {
	const [plane, setPlane] = useState('');

	const handleChange = (e) => {
		setPlane(e.target.value);
	};
	return (
		<Container>
			<Row justify='space-between' align='center' css={{ width: '100%' }}>
				<div>{`${leg.departureAirport}-${leg.arrivalAirport}`}</div>
				<input
					className='w-12 text-black'
					type='text'
					value={plane}
					onChange={handleChange}
				/>
				<a
					href={`https://dispatch.simbrief.com/options/custom?airline=ABC&fltnum=1234&type=${plane}&orig=${
						leg.departureAirport
					}&dest=${leg.arrivalAirport}&cargo=${
						leg.cargo / 1000
					}&pax=${leg.pax}&acdata=${JSON.stringify(acdata)}`}
					target='_blank'>
					<img src='http://www.simbrief.com/previews/sblogo_small.png' />
				</a>
			</Row>
		</Container>
	);
};
