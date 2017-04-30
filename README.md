# grunt-localtunnel-client [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Expose a local server to the world using Localtunnel

`grunt-localtunnel-client` exposes your localhost to the world for easy testing and sharing! No need to mess with DNS or deploy just to have others test out your changes.

Great for testing in physical mobile devices, working with browser testing tools or external api callback services which require a public url for callbacks.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-localtunnel-client --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-localtunnel-client');
```

## The "localtunnel_client" task

Note that this server only runs as long as grunt is running. Once grunt's tasks have completed, the web server stops. This behavior can be changed with the [keepalive](#keepalive) option, and can be enabled ad-hoc by running the task like `grunt localtunnel_client:keepalive`.

This task was designed to be used in conjunction with another task that is run immediately afterwards, like the [grunt-contrib-watch plugin][grunt-contrib-watch-url] `watch` task.

### Overview
In your project's Gruntfile, add a section named `localtunnel_client` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    localtunnel_client: {
        server: {
            options: {
                port: 8000,
                subdomain: 'mytestdomain'
            }
        }
    }
})
```

It will connect to the localtunnel server, setup the tunnel, and tell you what url to use for your testing. This url will remain active for the duration of your session; so feel free to share it with others.

### Options

#### port
Type: `Integer`  
Default: `8000`

Local server port. The server should already be listening to this port before attempting to tunnel.

#### subdomain
Type: `String`
Default: `undefined`

A string value requesting a specific subdomain on the proxy server. Subdomains must be lowercase and between 4 and 63 alphanumeric characters. Note You may not actually receive this name depending on availablily. If no specied a random subdomain will be assigned.

#### local_host
Type: `String`
Default: `localhost`

The hostname where your local server is running. This will also cause the Host header to be re-written to this value in proxied requests.

#### keepalive
Type: `Boolean`  
Default: `false`

Keep the server alive indefinitely. Note that if this option is enabled, any tasks specified after this task will _never run_. By default, once grunt's tasks have completed, the web server stops. This option changes that behavior.

This option can also be enabled ad-hoc by running the task like `grunt localtunnel_client:targetname:keepalive`

#### onSuccess
Type: `Function`
Default: `function(tunnel){}`

Custom callback for tunnel success. Receives the tunnel instance as its only argument.

#### onError
Type: `Function`
Default: `function(err){}`

Custom callback for tunnel errors. Receives the tunnel error as its only argument.

### Example

```js
grunt.initConfig({
    localtunnel_client: {
        server: {
            options: {
                port: 8001,
                subdomain: 'myothertestdomain',
                local_host: 'myotherhost',
                keepalive: true,
                onSuccess: function(tunnel) {
                    grunt.log.ok('Connected at: ', tunnel.url);
                },
                onError: function(err) {
                    grunt.log.error('Not cool! ', err);
                }
            }
        }
    }
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

*   1.0.0 _\[30/04/2017\]_
    *   Major code overhaul
    *   Better error prevention
    *   More intuitive messages
*   0.1.0 _\[24/04/2017\]_
    *   Initial release

## License

MIT © [Renato Rodrigues](https://github.com/rerodrigues)

[npm-image]: https://badge.fury.io/js/grunt-localtunnel-client.svg
[npm-url]: https://npmjs.org/package/grunt-localtunnel-client
[daviddm-image]: https://david-dm.org/rerodrigues/grunt-localtunnel-client.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/rerodrigues/grunt-localtunnel-client
[grunt-contrib-watch-url]: https://github.com/gruntjs/grunt-contrib-watch
