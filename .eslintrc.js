module.exports = {
	extends: ['airbnb', 'prettier'],
	env: {
		browser: true
	},
	rules: {
		'indent': [2, 'tab', { SwitchCase: 1 }],
		'react/jsx-indent': [2, 'tab'],
		'no-tabs': 0,
		'no-continue': 0,
		'import/prefer-default-export': 0,
		'no-case-declarations': 0,
		'no-underscore-dangle': 0,
		'no-console': 0,
	},
}
