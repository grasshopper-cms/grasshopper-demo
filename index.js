'use strict';

const authMiddleware = require('./node_modules/grasshopper-cms/plugins/admin/src/middlewares/auth.middleware');
const grasshopper = require('grasshopper-cms');
const express = require('express');
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
    adminMountPoint: 'admin',
    mode: 'develop',
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
            endpoint: 'mongodb://127.0.0.1:27017/grasshopper-demo',

            //see here for connection string information: https://www.npmjs.com/package/mongoose#connecting-to-mongodb
            host:  'mongodb://127.0.0.1:27017/grasshopper-demo',
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

        // Store authenticatedRequest and the grasshopper object on the npm's module for later use
        grasshopper.authenticatedRequest = result.authenticatedRequest;
        grasshopper.grasshopper = result.grasshopper;
        app.use('*', authMiddleware);
        console.log('listening on port 3000');
        app.listen(3000);
    })
    .catch(err => {
        console.log('error', err);
    });


