import { BaseDirectory, exists, readTextFile } from '@tauri-apps/api/fs';

export async function getApiTokens() {
	// check if the file exists
	const tokens = await exists('onbrief/apiData.dat', {
		dir: BaseDirectory.Data,
	});

	if (tokens) {
		const apiData = await readTextFile('onbrief/apiData.dat', {
			dir: BaseDirectory.Data,
		});

		const { apiKey, companyId } = JSON.parse(atob(apiData));
		return { apiKey, companyId };
	}

	return {};
}
