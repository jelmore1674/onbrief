import { Card, Container, Text, keyframes } from '@nextui-org/react';
import { useSelector } from 'react-redux';
const slideIn = keyframes({
	'0%': { transform: 'translateY(+200px)' },
	'100%': { transform: 'translateY(0px)' },
});

export const Toast = () => {
	const { message } = useSelector((state) => state.toast);
	return (
		<>
			{message && (
				<Container
					css={{
						position: 'fixed',
						bottom: 20,
						right: 0,
						zIndex: 1000,
						maxWidth: 300,
						animation: `${slideIn} 700ms ease-in-out`,
					}}>
					<Card
						css={{
							$$cardColor: '$colors$success',
							padding: 16,
						}}>
						<Text b>{message}</Text>
					</Card>
				</Container>
			)}
		</>
	);
};
