/*******************************************************************************
 * Copyright 2017 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/
'use strict';

var appmetrics = require('../../');
var monitor = appmetrics.monitor();
var server = require('../test_http_server').server;
var http = require('http');

var tap = require('tap');

tap.plan(2);

tap.tearDown(function() {
  server.close();
});

monitor.on('http', function(data) {
  tap.test('HTTP Event', function(t) {
    checkHttpData(data, t);
    t.end();
  });
});

function checkHttpData(data, t) {
  t.ok(isInteger(data.time), 'Timestamp is an integer');
  t.equals(data.method, 'GET', 'Should report GET as HTTP request method');
  t.equals(data.url, '/', 'Should report / as URL');
  t.equals(data.hasOwnProperty('duration'), true, 'Should have HTTP property duration;');
  t.ok(isNumeric(data.duration), 'duration is a number');
  t.equals(data.hasOwnProperty('header'), true, 'Should have HTTP property header;');
  t.equals(data.hasOwnProperty('statusCode'), true, 'Should have HTTP property statusCode;');
  t.ok(isInteger(data.statusCode), 'statusCode is an integer');
  t.equals(data.hasOwnProperty('contentType'), true, 'Should have HTTP property contentType;');
  t.equals(data.hasOwnProperty('requestHeader'), true, 'Should have HTTP property requestHeader;');
}

function isInteger(n) {
  return isNumeric(n) && n % 1 == 0;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Request with a callback
http.get(`http://localhost:${server.address().port}/`, function(res) {});

// Request without a callback
http.get(`http://localhost:${server.address().port}/`);
