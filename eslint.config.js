const { defineConfig } = require("eslint/config")
const expoConfig = require("eslint-config-expo/flat")
const eslintPluginPrettier = require("eslint-plugin-prettier/recommended")

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettier,
  {
    ignores: ["dist/*", "ios/*", "android/*"],
    rules: {
      "prettier/prettier": ["error"],
    },
  },
])
