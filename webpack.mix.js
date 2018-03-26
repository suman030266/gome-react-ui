const { mix } = require('laravel-mix');

mix
  .js('resources/assets/js/app.js', 'public/js')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
    },
  });