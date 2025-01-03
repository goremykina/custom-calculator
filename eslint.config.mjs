import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier/recommended";

export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jest,
			},
		},
	},
	pluginJs.configs.recommended,
	eslintConfigPrettier,
	prettierPlugin,
	{
		files: ["babel.config.js", "webpack.config.js"],
		languageOptions: {
			globals: globals.node,
		},
	},
	{
		ignores: ["dist/**"],
	},
];
