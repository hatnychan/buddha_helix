// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: `${process.env.NODE_ENV}`,

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        main: './src/main.ts'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: 'ts-loader'
            },
            {
                // 対象となるファイルの拡張子
                test: /\.(sc|c|sa)ss$/,
                use: [
                    // 拡張子が.cssのファイルに対して、use配列で指定したLoaderが後ろから順番に適用される。
                    // よって、sass-loader→postcss-loader→css-loader→MiniCssExtractPlugin.loader→style-loader
                    // の順に適応される。
                    // スタイルシートをJSからlinkタグに展開する機能
                    // 'style-loader',
                    // css情報を抽出するための機能
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    // CSSをJSにバンドルするための機能
                    {
                        loader: 'css-loader',
                        options: {
                            // falseでオプションでCSS内のurl()メソッドの取り込みを禁止する
                            // trueにしないとfontawesomeがうまく機能しなくなる
                            url: true,
                            sourceMap: `${process.env.NODE_ENV}` === 'development',
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            importLoaders: 2
                        }
                    },
                    // PostCSSのための設定(ベンダープレフィックスを付与する)
                    // postcss-loaderはversion4入れたらrequire('autoprefixer')が動かなかったので3.0.0を入れている
                    {
                        loader: 'postcss-loader',
                        options: {
                            // PostCSS側でもソースマップを有効にする
                            sourceMap: `${process.env.NODE_ENV}` === 'development',
                            postcssOptions: {
                              plugins: [
                                // Autoprefixerを有効化
                                // ベンダープレフィックスを自動付与する
                                ["autoprefixer", { grid: true }],
                              ],
                            },
                          },
                    },
                    // Sassをバンドルするための機能(Sassをcssに変換する)
                    {
                        loader: 'sass-loader',
                        options: {
                            // ソースマップの利用有無
                            sourceMap: `${process.env.NODE_ENV}` === 'development'
                        }
                    }
                ]
            },
            // fontawesome用
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './webfonts',
                            publicPath: '../webfonts'
                        }
                    }
                ]
            },
            // cssのurl()で読み取る画像
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    // こいつが無いとwebpack-dev-serverを起動した際にModule not found: Error: Can't resolveがでる。
    resolve: {
        extensions: ['.ts', '.js']
    },
    // source-map方式でないと、CSSの元ソースが追跡できない
    devtool: 'inline-source-map'
}
