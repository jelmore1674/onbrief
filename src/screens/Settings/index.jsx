import {
	Button,
	Container,
	Grid,
	Input,
	Spacer,
	Text,
} from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateToken } from '../../store/slices/tokens';
import { FaSave } from 'react-icons/fa';
import { dataDir } from '@tauri-apps/api/path';
import { writeTextFile, BaseDirectory, createDir } from '@tauri-apps/api/fs';
// Write a text file to the `$APPCONFIG/app.conf` path

export const Settings = () => {
	const { apiKey, companyId, vaId } = useSelector((state) => state.tokens);
	const dispatch = useDispatch();

	const saveData = async (keys) => {
		let tries = 0;
		try {
			const dataDirPath = await dataDir();
			await writeTextFile(
				'onbrief/apiData.dat',
				btoa(JSON.stringify(keys)),
				{
					dir: BaseDirectory.Data,
				}
			);
		} catch (e) {
			if (e.includes('No such file or directory')) {
				await createDir('onbrief', {
					dir: BaseDirectory.Data,
					recursive: true,
				});
			}
			tries = tries + 1;

			if (tries === 5) {
				console.log({ e });
			}

			await saveData(keys);
		}
	};

	return (
		<Container>
			<Text>{apiKey}</Text>
			<h1>Settings</h1>

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
			</Grid.Container>
			<Button
				icon={<FaSave size={16} />}
				onClick={() => saveData({ apiKey, companyId, vaId })}>
				Save
			</Button>
		</Container>
	);
};
