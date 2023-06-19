import axios from 'axios';
import axiosTauriAdapter from 'axios-tauri-adapter';

const apiKey = '1ab4a0f0-1071-46d7-9257-3b245657d520';
const companyId = '8c7ba836-4fa9-4a90-9a0a-39389486933d';

export const companyApi = axios.create({
	adapter: axiosTauriAdapter,
	baseURL: 'https://server1.onair.company/api/v1/company',
	headers: {
		'oa-apikey': apiKey,
		'Access-Control-Allow-Origin': '*',
		Accept: 'application/json',
		'User-Agent': `onair-api middleware for OnAir Company v1`,
	},
});

export async function getJobs() {
	const { data } = await companyApi.get(`/${companyId}/jobs/pending`);
	return data;
}
