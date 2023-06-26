import {
	Button,
	Container,
	Grid,
	Input,
	Loading,
	Row,
	Spacer,
	Text,
} from '@nextui-org/react';
import { BaseDirectory, createDir, writeTextFile } from '@tauri-apps/api/fs';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken, updateWorldTokens } from '../../store/slices/tokens';
import { updateToastMessage } from '../../store/slices/toast';
import { showToast } from './utils';

export const Settings = () => {
	const { world } = useSelector((state) => state.world);
	let { ...tokens } = useSelector((state) => state.tokens[world]);
	const formTokens = useSelector((state) => state.tokens);

	const [loading, setLoading] = useState(false);
	const [worldChange, setWorldChange] = useState(false);
	const dispatch = useDispatch();

	const saveData = async (keys) => {
		let tries = 0;
		setLoading(true);
		try {
			// await writeTextFile(
			// 	`onbrief/${world}/apiData.dat`,
			// 	btoa(JSON.stringify(keys)),
			// 	{
			// 		dir: BaseDirectory.Data,
			// 	}
			// );
			dispatch(updateWorldTokens(world));
			showToast(
				dispatch,
				updateToastMessage,
				'Successfully saved api keys'
			);
		} catch (e) {
			// if the file doesn't exist try again.
			console.error({ e });

			if (e?.includes('No such file or directory')) {
				tries = tries++;
				await createDir(`onbrief/${world}`, {
					dir: BaseDirectory.Data,
					recursive: true,
				});
				await saveData(keys);
			}

			if (tries === 5) {
				writeLog(JSON.stringify({ saveTokens: e }));
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setWorldChange(true);
		const newWorld = setTimeout(() => {
			setWorldChange(false);
		}, 200);
		return () => clearTimeout(newWorld);
	}, [world]);

	return (
		<Container>
			{worldChange ? (
				<Row justify='center' alignItems='center'>
					<Loading
						size='xl'
						css={{ alignSelf: 'center', justifySelf: 'center' }}
					/>
				</Row>
			) : (
				<>
					<Row justify='center'>
						<Text h1>Settings</Text>
					</Row>
					<Spacer y={2} />
					<Grid.Container gap={4}>
						<Grid>
							<Input.Password
								underlined
								labelPlaceholder='API Key'
								initialValue={tokens[world].apiKey}
								onChange={(e) =>
									dispatch(
										updateToken({ apiKey: e.target.value })
									)
								}
							/>
						</Grid>
						<Spacer y={3} />
						<Grid>
							<Input.Password
								underlined
								labelPlaceholder='Company ID'
								initialValue={tokens[world].companyId}
								onChange={(e) =>
									dispatch(
										updateToken({
											companyId: e.target.value,
										})
									)
								}
							/>
						</Grid>
						<Grid>
							<Input.Password
								underlined
								labelPlaceholder='VA-ID'
								initialValue={tokens[world].vaId}
								onChange={(e) =>
									dispatch(
										updateToken({ vaId: e.target.value })
									)
								}
							/>
						</Grid>
						<Grid xs={12}>
							{loading ? (
								<Button disabled>
									<Loading color='currentColor' />
								</Button>
							) : (
								<Button
									icon={<FaSave size={16} />}
									onClick={() =>
										saveData({ [world]: formTokens })
									}>
									Save
								</Button>
							)}
						</Grid>
					</Grid.Container>
				</>
			)}
		</Container>
	);
};
