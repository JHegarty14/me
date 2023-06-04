import { Pagination } from '../types';
import { CaseConverter } from '../util';

export const buildQueryString = <T extends Pagination>(query: T): string => {
	if (Object.values(query).length === 0) return '';

	const queryArr = Object.entries(query).reduce<string[]>(
		(acc, [key, value]) => {
			if (value) {
				acc.push(`${CaseConverter.convertToSnakeCase(key)}=${value}`);
			}
			return acc;
		},
		[]
	);

	return `?${queryArr.join('&')}`;
};
