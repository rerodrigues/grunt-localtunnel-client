/*
 * grunt-localtunnel-client
 * https://github.com/rerodrigues/grunt-localtunnel-client
 *
 * Copyright (c) 2017 Renato Rodrigues <renato@renatorodrigues.com>
 * Licensed under the MIT license.
 */

const localtunnel = require('localtunnel');

module.exports = (grunt) => {

    grunt.registerMultiTask('localtunnel_client', 'Expose a local server to the world using Localtunnel', function() {
        const done = this.async();

        const options = this.options({
            port: 8000,
            local_host: 'localhost',
            subdomain: undefined,
            keepalive: false,
            onError() {},
            onSuccess() {}
        });

        const callbacks = new Proxy({}, {
            set(target, key, value) {
                if(typeof value === 'function') {
                    target[key] = value;
                } else {
                    grunt.fail.warn(`Localtunnel-client: ${key} must be a valid function.`, 3);
                    target[key] = () => {};
                }
            }
        });

        const tunnelOptions = {
            subdomain: options.subdomain ? options.subdomain.toLowerCase().replace(/[^a-z0-9]/g,'') : undefined,
            local_host: options.local_host
        };

        const errorHandler = (err) => {
            callbacks.onError(err);
            done(grunt.log.error('Localtunnel: %s', err));
        };

        callbacks.onError = options.onError;
        callbacks.onSuccess = options.onSuccess;

        const tunnel = localtunnel(options.port, tunnelOptions, (err, tunnel) => {
            if (err) {
                errorHandler(err);
            }

            if(tunnel && tunnel.url) {
                grunt.log.ok(`Localtunnel: Successfully connected. Your public URL is ${tunnel.url}.`);
                callbacks.onSuccess(tunnel);
            }

            if(!(this.flags.keepalive || options.keepalive)) {
                done();
            }
        });

        tunnel.on('error', errorHandler);

        tunnel.on('close', () => done(grunt.log.ok('Localtunnel disconnected')) );

        process.on('exit', tunnel.close.bind(tunnel));
    });
};
