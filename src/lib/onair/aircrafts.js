import axios from 'axios';
import axiosTauriAdapter from 'axios-tauri-adapter';
import { companyApi } from './company';
import { getApiTokens } from './utils';

const aircraftApi = axios.create({
	adapter: axiosTauriAdapter,
	baseURL: 'https://server1.onair.company/api/v1/aircraft',
});
