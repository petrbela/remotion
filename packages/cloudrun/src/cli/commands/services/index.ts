import {CliInternals} from '@remotion/cli';
import {BINARY_NAME} from '../../../shared/constants';
import {quit} from '../../helpers/quit';
import {Log} from '../../log';
import {cloudRunDeploySubcommand, CLOUD_RUN_DEPLOY_SUBCOMMAND} from './deploy';
import {servicesLsCommand, SERVICES_LS_SUBCOMMAND} from './ls';
import {servicesRmCommand, SERVICES_RM_SUBCOMMAND} from './rm';
import {servicesRmallCommand, SERVICES_RMALL_SUBCOMMAND} from './rmall';

export const SERVICES_COMMAND = 'services';

const printCloudRunHelp = () => {
	Log.info(`${BINARY_NAME} ${SERVICES_COMMAND} <subcommand>`);
	Log.info();
	Log.info('Available subcommands:');
	CliInternals.Log.info('');
	CliInternals.Log.info(
		`${BINARY_NAME} ${SERVICES_COMMAND} ${SERVICES_LS_SUBCOMMAND}`
	);
	CliInternals.Log.info(
		CliInternals.chalk.gray('Lists the services currently deployed')
	);
	Log.info('');
	Log.info(`${BINARY_NAME} ${SERVICES_COMMAND} ${CLOUD_RUN_DEPLOY_SUBCOMMAND}`);
	Log.info(CliInternals.chalk.gray('Deploy a new Cloud Run service'));
	CliInternals.Log.info('');
	CliInternals.Log.info(
		`${BINARY_NAME} ${SERVICES_COMMAND} ${SERVICES_RM_SUBCOMMAND} <service-name>`
	);
	CliInternals.Log.info(CliInternals.chalk.gray('Delete a Cloud Run service'));
	CliInternals.Log.info('');
	CliInternals.Log.info(
		`${BINARY_NAME} ${SERVICES_COMMAND} ${SERVICES_RMALL_SUBCOMMAND}`
	);
	CliInternals.Log.info(
		CliInternals.chalk.gray('Delete all services in selected region')
	);
};

export const servicesCommand = (args: string[]) => {
	if (args[0] === SERVICES_LS_SUBCOMMAND) {
		return servicesLsCommand();
	}

	if (args[0] === SERVICES_RM_SUBCOMMAND) {
		return servicesRmCommand(args.slice(1));
	}

	if (args[0] === SERVICES_RMALL_SUBCOMMAND) {
		return servicesRmallCommand();
	}

	if (args[0] === CLOUD_RUN_DEPLOY_SUBCOMMAND) {
		return cloudRunDeploySubcommand();
	}

	if (args[0]) {
		Log.error(`Subcommand ${args[0]} not found.`);
		printCloudRunHelp();
		quit(1);
	}

	printCloudRunHelp();
};