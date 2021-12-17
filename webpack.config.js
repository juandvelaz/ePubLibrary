module.exports = {
  entry: ['./client/index.js'],
  mode: 'development',
  output: {
    path: __dirname,
    filename: './public/webpack/bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
};
