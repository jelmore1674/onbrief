import axios from 'axios';
import axiosTauriAdapter from 'axios-tauri-adapter';
import { companyApi } from './company';
import { getApiTokens } from './utils';

// const apiKey = '1ab4a0f0-1071-46d7-9257-3b245657d520';
// const companyId = '8c7ba836-4fa9-4a90-9a0a-39389486933d';

const aircraftApi = axios.create({
	adapter: axiosTauriAdapter,
	baseURL: 'https://server1.onair.company/api/v1/aircraft',
});

// export async function getFleet() {
// 	const { apiKey, companyId } = getApiTokens();

// 	const aircraftId = Content[12].Id;
// 	const {
// 		data: { Content: plane },
// 	} = await aircraftApi.get(`/${aircraftId}`, {
// 		headers: {
// 			'oa-apikey': apiKey.toString(),
// 			'Access-Control-Allow-Origin': '*',
// 			Accept: 'application/json',
// 			'User-Agent': `onair-api middleware for OnAir Company v1`,
// 		},
// 	});
// 	return plane;
// }
