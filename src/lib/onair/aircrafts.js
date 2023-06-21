import axios from 'axios';
import { getClient, fetch } from '@tauri-apps/api/http';
import axiosTauriAdapter from 'axios-tauri-adapter';
import { companyApi } from './company';
import { exists, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
// Check if the `$APPDATA/avatar.png` file exists

const apiKey = '1ab4a0f0-1071-46d7-9257-3b245657d520';
const companyId = '8c7ba836-4fa9-4a90-9a0a-39389486933d';

const baseURL = 'https://server1.onair.company/api/v1/company';

const client = await getClient();

const aircraftApi = axios.create({
	adapter: axiosTauriAdapter,
	baseURL: 'https://server1.onair.company/api/v1/aircraft',
});

export async function getFleet() {
	const tokens = await exists('onbrief/apiData.dat', {
		dir: BaseDirectory.Data,
	});

	if (tokens) {
		const apiData = await readTextFile('onbrief/apiData.dat', {
			dir: BaseDirectory.Data,
		});

		const { apiKey } = JSON.parse(atob(apiData));

		const {
			data: { Content },
		} = await companyApi.get(`/${companyId}/fleet`);

		const aircraftId = Content[12].Id;
		const {
			data: { Content: plane },
		} = await aircraftApi.get(`/${aircraftId}`, {
			headers: {
				'oa-apikey': apiKey.toString(),
				'Access-Control-Allow-Origin': '*',
				Accept: 'application/json',
				'User-Agent': `onair-api middleware for OnAir Company v1`,
			},
		});
		return plane;
	}
}
