const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
	filename: 'bundle.js',
	path: path.resolve(__dirname, 'dist'),
	clean: true,
  },
  module: {
	rules: [
	  {
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
		  loader: 'babel-loader',
		},
	  },
	  {
		test: /\.css$/,
		use: ['style-loader', 'css-loader'],
	  },
	],
  },
  plugins: [
	new HtmlWebpackPlugin({
	  template: './public/index.html',
	  filename: 'index.html',
	}),
  ],
  resolve: {
	extensions: ['.js', '.jsx'],
  },
  devServer: {
	port: 3000,
	hot: true,
	historyApiFallback: true,
  },
};
