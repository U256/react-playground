module.exports = {
	files: ['**/*.css', '**/*.scss'],
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
	customSyntax: 'postcss-scss',
	defaultSeverity: 'warning',
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-config-rational-order',
		'stylelint-prettier/recommended',
	],
	plugins: ['stylelint-order', 'stylelint-scss', 'stylelint-prettier'],
}
