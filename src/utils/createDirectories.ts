import {
	exists,
	createDir,
	BaseDirectory,
	writeTextFile,
	readTextFile,
} from '@tauri-apps/api/fs';

const APP_NAME = 'onbrief';

export const DIRECTORIES = {
	DATA: `${APP_NAME}`,
};

export const FILES = {
	APP_LOG: 'logs/onbrief.log',
};

const LOG_DIVIDER = '-------------------------------';

export async function writeLog(newLog: string) {
	const now = new Date().toUTCString();
	const log = await readTextFile(FILES.APP_LOG, {
		dir: BaseDirectory.AppLog,
	});
	await writeTextFile(
		FILES.APP_LOG,
		`${log}\n${LOG_DIVIDER}\n ${now} \n${LOG_DIVIDER}\n${newLog}`,
		{
			dir: BaseDirectory.AppLog,
		}
	);
}

export async function createAllDirectories() {
	try {
		const dataDir = await exists(APP_NAME, { dir: BaseDirectory.Data });
		const logDir = await exists(FILES.APP_LOG, {
			dir: BaseDirectory.AppLog,
		});

		if (logDir) {
			// This will clear the log.
			await writeTextFile(FILES.APP_LOG, 'Begin Log', {
				dir: BaseDirectory.AppLog,
			});
		}

		if (!dataDir) {
			await createDir(APP_NAME, {
				dir: BaseDirectory.Data,
				recursive: true,
			});
		}
		if (!logDir) {
			await createDir('logs', {
				dir: BaseDirectory.AppLog,
				recursive: true,
			});
			await writeTextFile(FILES.APP_LOG, 'Begin Log', {
				dir: BaseDirectory.AppLog,
			});
		}
	} catch (error) {
		console.log({ createDir: error });
	}
}
