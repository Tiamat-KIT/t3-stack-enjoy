/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    watchOptions: {
        pollIntervalMs: 3000
    },
    webpack(config,{dev}) {
        if(dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 200
            }
        }
        return config
    }
};

export default config;
