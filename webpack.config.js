const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const config = {
  entry: {
    app: './script/script.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: "[name].bundle.js",
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./html/index.pug`
    }),
    new CopyWebpackPlugin([
      { from: 'misc' },
      { from: 'images', to: 'images' },
      { from: 'style', to: 'style' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.(txt|csv|mmdb)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[path][name].[ext]",
              emitFile: true,
            },
          },
        ],
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') return config;
  if (argv.mode === 'production') return config;
}
