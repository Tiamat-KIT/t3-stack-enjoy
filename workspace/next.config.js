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
    webpack(config,context) {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300
        }
        return config
    }
    // export WATCHPACK_POLLING=true
};

export default config;
