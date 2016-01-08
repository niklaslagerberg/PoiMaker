"use strict"

//const SERVER_URL = 'http://192.168.1.186:3999/'; // Hemma
//const SERVER_URL = 'http://10.64.33.11:3999/'; // Jobbet
const SERVER_URL = 'http://localhost:3999/'; // Localhost

var Utils = {
   ServerUrl:function () {
      return SERVER_URL;
   }
}

module.exports = Utils;
