import axios from 'axios';
import { getClient, fetch } from '@tauri-apps/api/http';
import axiosTauriAdapter from 'axios-tauri-adapter';
import { companyApi } from './company';

const apiKey = '1ab4a0f0-1071-46d7-9257-3b245657d520';
const companyId = '8c7ba836-4fa9-4a90-9a0a-39389486933d';

const baseURL = 'https://server1.onair.company/api/v1/company';

const client = await getClient();

const aircraftApi = axios.create({
	adapter: axiosTauriAdapter,
	baseURL: 'https://server1.onair.company/api/v1/aircraft',
	headers: {
		'oa-apikey': apiKey.toString(),
		'Access-Control-Allow-Origin': '*',
		Accept: 'application/json',
		'User-Agent': `onair-api middleware for OnAir Company v1`,
	},
});

export async function getFleet() {
	const {
		data: { Content },
	} = await companyApi.get(`/${companyId}/fleet`);

	const aircraftId = Content[12].Id;
	const {
		data: { Content: plane },
	} = await aircraftApi.get(`/${aircraftId}`);

	return plane;
}
