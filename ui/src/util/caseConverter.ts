/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	CamelToSnakeCase,
	CamelToSnakeCaseNested,
	SnakeToCamelCase,
	SnakeToCamelCaseNested,
} from '../types';

export class CaseConverter {
	static convertToCamelCase<S extends string>(str: S): SnakeToCamelCase<S> {
		return str
			.split(/[-_]/g)
			.map((word, index) =>
				index === 0
					? word.charAt(0).toLowerCase() + word.slice(1)
					: word.charAt(0).toUpperCase() + word.slice(1)
			)
			.join('') as SnakeToCamelCase<S>;
	}

	static convertToSnakeCase<S extends string>(str: S): CamelToSnakeCase<S> {
		return str
			.split(/(?=[A-Z])/g)
			.map((word) => word.toLowerCase())
			.join('_') as CamelToSnakeCase<S>;
	}

	static convertKeysToCamelCase<
		T extends Record<string, any>,
		C extends SnakeToCamelCaseNested<T>
	>(obj: T): C {
		if (typeof obj !== 'object') {
			return obj;
		}

		const newObj = {} as C;

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				newObj[CaseConverter.convertToCamelCase(key) as keyof C] =
					CaseConverter.convertKeysToCamelCase(obj[key as keyof T]);
			}
		}

		return newObj;
	}

	static convertKeysToSnakeCase<
		T extends Record<string, any>,
		C extends CamelToSnakeCaseNested<T>
	>(obj: T): C {
		if (typeof obj !== 'object') {
			return obj;
		}

		const newObj = {} as C;

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				newObj[CaseConverter.convertToSnakeCase(key) as keyof C] =
					CaseConverter.convertKeysToSnakeCase(obj[key as keyof T]);
			}
		}

		return newObj;
	}
}
