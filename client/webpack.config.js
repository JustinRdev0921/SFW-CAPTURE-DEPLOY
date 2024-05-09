const path = require('path');

module.exports = {
  mode: 'development', // O 'production' para producción
  entry: './src/main.jsx', // Ruta del archivo principal de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(pdf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'Files/', // Carpeta de salida para los archivos
            },
          },
        ],
      },
    ],
  },
};
