const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCss = require('@zeit/next-css');
const webpack = require("webpack");
const path = require("path");
const withPWA = require('next-pwa');
 
module.exports = (
    withPWA({
        pwa: {
            dest: 'public'
        }
    }),
    withPlugins([[withSass],[withCss], [withImages]], {
        webpack(config, options) {
            config.resolve.modules.push(path.resolve("./"));
            return config;
        }
    })
    
    
)
