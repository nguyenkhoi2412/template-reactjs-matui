module.exports = {
  plugins: ["react"], // use the plugin rules within ESLint
  settings: {
    "import/resolver": {
      alias: [
        ["@app", "./src/app"],
        ["@assets", "./src/assets"],
        ["@containers", "./src/containers"],
        ["@modules", "./src/modules"],
        ["@components", "./src/components"],
        ["@redux", "./src/redux"],
        ["@schema", "./src/schema"],
        ["@utils", "./src/utils"],
        ["@services", "./src/services"],
        ["@stores", "./src/stores"],
      ],
    },
  },
};
