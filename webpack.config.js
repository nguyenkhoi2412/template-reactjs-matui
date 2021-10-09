const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = () => {
  const isDev = process.env.NODE_ENV || "development";
  return {
    entry: {
      index: path.resolve(__dirname, "src", "index.js"),
    },
    module: {
      rules: [
        //#region Rules for js
        {
          test: /\.(js|jsx)$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/react",
                {
                  plugins: ["@babel/plugin-transform-react-jsx"],
                },
              ],
            },
          },
        },
        //#endregion
        //#region Rules for css
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev ? true : false,
                url: true,
              },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: isDev ? true : false },
            },
            {
              loader: "sass-resources-loader",
              options: {
                resources: require(path.join(
                  process.cwd(),
                  "src/assets/_utils.js"
                )),
              },
            },
          ],
        },
        //#endregion
        //#region Rules for images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        //#endregion
        //#region Rules for fonts
        {
          // config for fonts
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        //#endregion
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".scss", ".css"],
      alias: {
        "@": path.resolve(__dirname, "src"), // shortcut to reference src folder from anywhere
        "@@": path.resolve(),
        "@app": path.resolve(__dirname, "src/app"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@containers": path.resolve(__dirname, "src/containers"),
        "@modules": path.resolve(__dirname, "src/modules"),
        "@components": path.resolve(__dirname, "src/components"),
        "@redux": path.resolve(__dirname, "src/redux"),
        "@schema": path.resolve(__dirname, "src/schema"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@services": path.resolve(__dirname, "src/services"),
        "@stores": path.resolve(__dirname, "src/stores"),
      },
      fallback: {
        crypto: false,
      },
    },
    output: {
      path: path.resolve("dist"),
      publicPath: "/",
      filename: "bundle.[hash:8].js",
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false,
      },
    },
    devtool: isDev ? "source-map" : false,
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 4001,
      hot: true,
      publicPath: "/",
      watchContentBase: true,
      historyApiFallback: true,
    },
    plugins: [
      //new CleanWebpackPlugin(),
      new Dotenv(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.HotModuleReplacementPlugin(), // renew components
      new MiniCssExtractPlugin({
        // plugin for controlling how compiled css will be outputted and named
        filename: isDev ? "[name].css" : "[name].[hash].css",
        chunkFilename: isDev ? "[id].css" : "[id].[hash].css",
      }),
      new webpack.ProvidePlugin({
        // using anywhere
        $: "jquery",
        jQuery: "jquery",
        React: "react",
      }),
      new HtmlWebpackPlugin({
        // plugin for inserting scripts into html
        template: path.resolve(__dirname, "src", "index.html"),
        filename: "index.html",
        hash: true, //them thẻ <script> với đường link đính kèm 1 mã hash
        cache: true, //cache file nếu có ko co thay đổi thì ko bundle lại
        showErrors: false, //neu co loi sẽ ghi vào file html
        //favicon: "src/favicon.ico", //them file favicon vào trang html
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      // new UglifyJsPlugin({
      //   exclude: [/\.min\.js$/gi], // skip pre-minified libs
      // }),
    ],
  };
};
