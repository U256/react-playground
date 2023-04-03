/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
	env: {
		browser: true,
		node: true,
		es2020: true,
		'shared-node-browser': true,
	},
	ignorePatterns: ['*.config.js', '.eslintrc.js', 'node_modules/*', '.next'],
	root: true,
	extends: [
		'eslint:recommended',
		'airbnb',
		'plugin:import/recommended',
		'plugin:react/recommended',
		'next/core-web-vitals',
		'prettier',
	],
	plugins: ['import', 'react', 'react-hooks', 'jsx-a11y', 'prettier', 'unused-imports'],
	settings: {
		react: {
			version: 'detect',
		},
		next: {
			rootDir: __dirname,
		},
	},
	rules: {
		'arrow-body-style': 0,
		'object-curly-newline': 0,
		'max-len': 'error',
		'linebreak-style': ['error', 'unix'],
		'no-underscore-dangle': 0,
		'class-methods-use-this': 0,
		'no-unused-vars': 'off',
		'max-lines-per-function': [
			'error',
			{ max: 25, skipComments: true, IIFEs: true, skipBlankLines: true },
		],
		'max-lines': ['error', { max: 150, skipComments: true, skipBlankLines: true }],
		'import/prefer-default-export': 0,
		'prettier/prettier': ['error'],
		'react/react-in-jsx-scope': 0,
		'react/function-component-definition': 0,
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-indent': 0,
		'react/jsx-key': 'error',
		'react/require-default-props': 0,
		'@next/next/no-html-link-for-pages': 0,

		// unused imports autoremove:
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
		'import/order': [
			'warn',
			{
				groups: ['builtin', 'external', 'internal', 'object', 'parent', 'sibling', 'index', 'type'],
				pathGroups: [
					// Sorts by record order in array, but "group" and "position" have bigger priority
					// so keep order consistant with "group" and "position" values
					{ pattern: 'constant/**', group: 'internal', position: 'before' },
					{ pattern: 'container/**', group: 'internal', position: 'before' },
					{ pattern: 'module/entity/**', group: 'internal', position: 'before' },
					{ pattern: 'module/service/**', group: 'internal', position: 'before' },
					{ pattern: 'module/provider/**', group: 'internal', position: 'before' },
					{ pattern: 'helper/**', group: 'internal', position: 'after' },
					{ pattern: 'util/**', group: 'object', position: 'after' },
					{ pattern: 'container/**', group: 'object', position: 'after' },
					{ pattern: 'component/**', group: 'object', position: 'after' },
					{ pattern: 'kit/**', group: 'object', position: 'after' },
					{ pattern: './styles', group: 'object', position: 'after' },
				],
			},
		],
	},
	overrides: [
		{
			files: ['*.jsx', '*.tsx'],
			rules: {
				'max-lines-per-function': 0,
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
				sourceType: 'module',
			},
			extends: [
				'eslint:recommended',
				'plugin:import/recommended',
				'plugin:import/typescript',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/strict',
				'airbnb-typescript',
				'prettier',
			],
			plugins: [
				'@typescript-eslint',
				'react',
				'react-hooks',
				'jsx-a11y',
				'prettier',
				'unused-imports',
			],
			rules: {
				'@typescript-eslint/indent': 0,
				'@typescript-eslint/naming-convention': 'warn',
				'@typescript-eslint/no-unused-vars': 'off',
			},
		},
	],
}
