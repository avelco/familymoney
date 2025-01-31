import type { ErrorType } from '../types/errorType';

export const handleErrors = (validationResult: any) => {
	const errors: ErrorType[] = validationResult.error.issues.map((error: any) => {
		return {
			field: error.path[0],
			message: error.message
		};
	});

	return errors;
};
