'use strict';

const express = require('express');
const grasshopper = require('grasshopper-cms');
const path = require('path');
const app = express();

const configs = {
    app : app,
    express : express,
    plugins : [],
    admin: {
        username: "admin",
        password: "TestPassword"
    },
    env: 'local',
    grasshopper: {
        assets: {
            default : "local",
            tmpdir : "{absolute path to tmp directory}",
            engines: {
                local:{
                    path: path.join(__dirname, 'tmp'),
                    urlbase: "http://localhost:3000"
                }
            }
        },
        crypto: {
            secret_passphrase : '1348a142-7119-4142-9312856cabd8'
        },
        db: {
            type: 'mongodb',
            defaultPageSize: 10000,
            endpoint: 'mongodb://127.0.0.1:27017',
            host:  'mongodb://127.0.0.1:27017',
            database:  'grasshopper-demo',
            debug:  true
        },
        server: {
            proxy: true,
            host:  'localhost',
            https: false,
            maxFilesSize: 16000000
        }
    },
    logger: {
        adapters : [{
            type : 'console',
            application : 'ghdemo',
            machine : 'dev'
        }]
    },
    port: 3000,
    verbose: true
};

console.log('starting grasshopper cms');

grasshopper
    .start(configs)
    .then(result => {
        grasshopper.authenticatedRequest = result.authenticatedRequest;
        grasshopper.grasshopper = result.grasshopper;
        app.use('/api', grasshopper.grasshopper.router);
        console.log('listening on port 3000');
        app.listen(3000);
    })
    .catch(err => {
        console.log('error', err);
    });


