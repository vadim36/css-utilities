import path from 'path';
import Webpack from 'webpack';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'; 

type TMode = 'development' | 'production';

interface TENV_CONFIG_VARS  {
  mode: TMode
}

export default function(ENV: TENV_CONFIG_VARS):Webpack.Configuration {
  const config: Webpack.Configuration = {
    mode: ENV.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    plugins: [
      new MiniCSSExtractPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.ts$/i,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  }

  return config;
}