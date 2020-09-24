const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { allowedNodeEnvironmentFlags } = require("process");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimiseCssAssttsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
console.log(`=> isDev: ${isDev}`);

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all",
        },
    };
    if (isProd) {
        config.minimizer = [
            new OptimiseCssAssttsPlugin(),
            new TerserWebpackPlugin(),
        ];
    }
    return config;
};

const cssLoaders = (extra) => {
    const loaders = [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
        },
        "css-loader",
    ];
    if (extra) {
        loaders.push(extra);
    }
    return loaders;
};

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src/assets/img"),
                to: path.resolve(__dirname, "dist/images"),
            }, ],
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? "[name].[chunkhash].css" : "[name].css",
        }),
    ];
    if (isProd) {
        base.push(new BundleAnalyzerPlugin()); //127.0.0.1:8888
    }
    return base;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.js"],
    },
    output: {
        filename: isProd ? "[name].[chunkhash].js" : "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@models": path.resolve(__dirname, "src/models"),
            "@": path.resolve(__dirname, "src"),
        },
    },
    optimization: optimization(),
    devServer: {
        port: 7700,
        hot: isDev,
    },
    devtool: isDev ? "source-map" : "",
    plugins: plugins(),
    module: {
        rules: [{
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.less$/,
                use: cssLoaders("less-loader"),
            },
            {
                test: /\.(png|jpg|svg|gif|ico)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    },
                },
            },
        ],
    },
};