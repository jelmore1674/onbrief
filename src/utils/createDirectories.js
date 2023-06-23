import { exists, createDir, BaseDirectory } from '@tauri-apps/api/fs';

const APP_NAME = 'onbrief';

export const DIRECTORIES = {
	DATA: `${APP_NAME}`,
};

export async function createAllDirectories() {
	const dataDir = await exists(APP_NAME, { dir: BaseDirectory.Data });

	if (!dataDir) {
		await createDir(APP_NAME, {
			dir: BaseDirectory.Data,
			recursive: true,
		});
	}
}
