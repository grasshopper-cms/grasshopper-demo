'use strict'

const express = require('express');
const ghCms = require('grasshopper-cms');
const path = require('path');
const app = express();

const configs = {
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
            endpoint: 'mongodb://localhost:27017',
            host:  'localhost:27017',
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
            application : 'njasap',
            machine : 'dev'
        }]
    },
    port: variables.port,
    verbose: variables.verbose,
    projectIsInAppDir: variables.projectIsInAppDir
};

ghCms.start(configs);
