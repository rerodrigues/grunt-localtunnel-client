# grunt-localtunnel-client [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Expose a local server to the world using Localtunnel

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-localtunnel-client --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-localtunnel-client');
```

## The "localtunnel_client" task

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

### Options

#### port
Type: `Integer`  
Default: `8000`

The port to tunnel. Local server should already be listening to this port before attempting to tunnel.

#### subdomain
Type: `String`
Default: `undefined`

Request a subdomain to tunnel to on <https://localtunnel.me>.

#### local_host
Type: `String`
Default: `localhost`

The local hostname for the requests tunnel.

#### keepalive
Type: `Boolean`  
Default: `false`

Keep the server alive indefinitely. Note that if this option is enabled, any tasks specified after this task will _never run_. By default, once grunt's tasks have completed, the web server stops. This option changes that behavior.

This option can also be enabled ad-hoc by running the task like `grunt localtunnel:targetname:keepalive`

#### onSuccess
Type: `Function`
Default: `function(tunnel){}`

Custom handler for tunnel success. Receives the tunnel instance as its only argument.

#### onError
Type: `Function`
Default: `function(err){}`

Custom handler for tunnel error. Receives the tunnel error as its only argument.


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

*   0.1.0 _\[18/04/2017\]_
    *   Initial release

## License

MIT © [Renato Rodrigues](https://github.com/rerodrigues)

[npm-image]: https://badge.fury.io/js/grunt-localtunnel-client.svg
[npm-url]: https://npmjs.org/package/grunt-localtunnel-client
[daviddm-image]: https://david-dm.org/rerodrigues/grunt-localtunnel-client.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/rerodrigues/grunt-localtunnel-client
