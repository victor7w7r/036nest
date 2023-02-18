/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { IgnorePlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const tsConfigFile = 'tsconfig.json';

module.exports = {
  entry: './src/main',
  externals: {
    sqlite3: 'commonjs sqlite3'
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
        test: /\.ts$/,
      },
      {
        test: /\.html$/i,
        loader: "raw-loader"
      },
      {
        test: /\.cs$/i,
        loader: "raw-loader"
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        }
      })
    ],
    nodeEnv: false
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@fastify/static',
          '@fastify/view',
          'mock-aws-s3',
          'aws-sdk',
          'nock',
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          '@nestjs/platform-express',
          '@nestjs/websockets/socket-module',
          'amqp-connection-manager',
          'amqplib',
          'cache-manager',
          'cache-manager/package.json',
          'class-transformer/storage',
          'ioredis',
          'kafkajs',
          'mqtt',
          'nats',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, { paths: [process.cwd()] });
        } catch (err) {
          return true;
        }
        return false;
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    mainFields: ['main'],
    plugins: [new TsconfigPathsPlugin({ configFile: tsConfigFile })],
  },
  target: 'node'
};
