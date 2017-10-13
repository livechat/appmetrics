/*******************************************************************************
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
'use strict';

// Used for running globally with node-hc - testing agent runs and doesn't crash process
// In case it doesn't, set a timeout

var appmetrics;

// Write a string to memory on timer
var ih = setInterval(function() {
  var dummy = new Buffer(1024 * 1024);
  dummy.write('hello');
  dummy.toString()[0];
}, 100);

// run long enough to ensure the agent has loaded and process doesn't crash
var duration_secs = process.argv[2] || 10; // Default 10 seconds for global tests
setTimeout(function() {
  clearInterval(ih);
}, duration_secs * 1000);

module.exports.start = function start() {
  return appmetrics.start();
};

module.exports.endRun = function() {
  appmetrics.stop();
  clearInterval(ih);
};
