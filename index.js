'use strict';

const authMiddleware = require('./node_modules/grasshopper-cms/plugins/admin/src/middlewares/auth.middleware');
const grasshopper = require('grasshopper-cms');
const express = require('express');
const path = require('path');
const app = express();

const configs = {
    app,
    express,
    admin: {
        username: "admin",
        password: "TestPassword"
    },
    // Comment this line in to work on gh admin with npm link
    // mode: 'develop',
    env: 'local',
    grasshopper: {
        // Comment these lines in to see /admin2 using /api2
        // adminMountPoint: '/admin2',
        // apiMountPoint: '/api2',
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
            //see here for connection string information: https://www.npmjs.com/package/mongoose#connecting-to-mongodb
            host:  'mongodb://127.0.0.1:27017/grasshopper-demo',
            database:  'grasshopper-demo',
            debug:  false
        },
        server: {
            proxy: true,
            host:  'localhost',
            https: false,
            maxFilesSize: 16000000
        },
        plugins: [
            {
                name: 'test',
                label: 'Test Plugin',
                icon: 'fa-user',
                path: path.join(__dirname, './plugins/test')
            },
            {
                // this plugin gets no ui in the admin
                name : 'headless',
                path: path.join(__dirname, './plugins/headless')
            }]
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
    .then((ghCms) => {
        console.log('ghCms.authenticatedRequest', Object.keys(ghCms.authenticatedRequest));
        console.log('ghCms.grasshopper', Object.keys(ghCms.grasshopper));
        process.nextTick(() => app.use('/', authMiddleware));
        console.log('listening on port 3000');
        app.listen(3000);
    })
    .catch(err => {
        console.log('error', err);
    });
