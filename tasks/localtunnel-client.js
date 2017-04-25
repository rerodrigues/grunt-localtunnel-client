/*
 * grunt-localtunnel-client
 * https://github.com/rerodrigues/grunt-localtunnel-client
 *
 * Copyright (c) 2017 Renato Rodrigues <renato@renatorodrigues.com>
 * Licensed under the MIT license.
 */

var localtunnel = require('localtunnel');

module.exports = (grunt) => {

    grunt.registerMultiTask('localtunnel_client', 'Expose a local server to the world using Localtunnel', function() {
        const done = this.async();

        const defaults = {
            port: 8000,
            local_host: 'localhost',
            subdomain: undefined,
            keepalive: false,
            onSuccess() {},
            onError() {}
        };

        const options = this.options(defaults);

        var tunnel = localtunnel(options.port, options, (err, tunnel) => {
            if (err) {
                options.onError(err);
                done(grunt.log.error('Localtunnel: %s', err));
            }

            grunt.log.ok('Localtunnel: Successfully connected at %s', tunnel.url);
            options.onSuccess(tunnel);

            if(!(this.flags.keepalive || options.keepalive)) {
                done();
            }
        });

        tunnel.on('error', (err) => {
            options.onError(err);
            grunt.log.error('Localtunnel: %s', err);
        });

        tunnel.on('close', () => done(grunt.log.ok('Localtunnel disconnected')) );

        process.on('exit', tunnel.close.bind(tunnel));
    });
};
