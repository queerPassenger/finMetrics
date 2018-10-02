module.exports = {
    devServer: {
      inline:true,
      port: 8007
    },
    entry: './jsx/entry.jsx',
    output: { path: __dirname, filename: './scripts/bundle.js' },
  
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['env', 'react']
          }
        }
      ]
    },
  };