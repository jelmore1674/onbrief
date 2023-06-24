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
import { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken } from '../../store/slices/tokens';
import { updateToastMessage } from '../../store/slices/toast';
import { showToast } from './utils';

export const Settings = () => {
	const { apiKey, companyId, vaId } = useSelector((state) => state.tokens);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const saveData = async (keys) => {
		let tries = 0;
		setLoading(true);
		try {
			await writeTextFile(
				'onbrief/apiData.dat',
				btoa(JSON.stringify(keys)),
				{
					dir: BaseDirectory.Data,
				}
			);
			showToast(
				dispatch,
				updateToastMessage,
				'Successfully saved api keys'
			);
		} catch (e) {
			// if the file doesn't exist try again.
			if (e.includes('No such file or directory')) {
				tries = tries++;
				await createDir('onbrief', {
					dir: BaseDirectory.Data,
					recursive: true,
				});
				await saveData({ ...keys, savedTokens: keys });
			}

			if (tries === 5) {
				writeLog(JSON.stringify({ saveTokens: e }));
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<Row justify='center'>
				<Text h1>Settings</Text>
			</Row>
			<Spacer y={2} />
			<Grid.Container gap={4}>
				<Grid>
					<Input.Password
						underlined
						labelPlaceholder='API Key'
						initialValue={apiKey}
						onChange={(e) =>
							dispatch(updateToken({ apiKey: e.target.value }))
						}
					/>
				</Grid>
				<Spacer y={3} />
				<Grid>
					<Input.Password
						underlined
						labelPlaceholder='Company ID'
						initialValue={companyId}
						onChange={(e) =>
							dispatch(updateToken({ companyId: e.target.value }))
						}
					/>
				</Grid>
				<Grid>
					<Input.Password
						underlined
						labelPlaceholder='VA-ID'
						initialValue={vaId}
						onChange={(e) =>
							dispatch(updateToken({ vaId: e.target.value }))
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
								saveData({ apiKey, companyId, vaId })
							}>
							Save
						</Button>
					)}
				</Grid>
			</Grid.Container>
		</Container>
	);
};
