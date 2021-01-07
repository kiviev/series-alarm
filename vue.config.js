module.exports = {

    publicPath: '/series-alarm',
    outputDir: 'dist',
    assetsDir: 'assets',
    configureWebpack: {

    },

    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Series Alarm',
        },
    },
    css: {
      loaderOptions: {
        scss: {
          prependData: `
                  @import "@/scss/main.scss";
                  `,
        },
      },
    },
};