const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // Import webpack
const Dotenv = require('dotenv-webpack');

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
		  options: {
			presets: ['@babel/preset-env', '@babel/preset-react'],
		  },
		},
	  },
	  {
		test: /\.css$/,
		use: ['style-loader', 'css-loader', 'postcss-loader'],
	  },
	  {
		test: /\.(png|svg|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	  },
	],
  },
  plugins: [
	new HtmlWebpackPlugin({
	  template: './public/index.html',
	  filename: 'index.html',
	}),
	new Dotenv(),
  ],
  resolve: {
	extensions: ['.js', '.jsx'],
  },
  devServer: {
	port: 3000,
	hot: true,
	historyApiFallback: true,
	static: {
	  directory: path.join(__dirname, 'public'),
	},
  },
};
