export default {
  test: /.(ttf|otf|eot|woff(2)?)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/'
    }
  }]
}
