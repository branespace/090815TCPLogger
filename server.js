"use strict";

var tcp = require('net'),
    fs = require('fs'),
    rid = require('readable-id');

exports.server = tcp.createServer(function (socket) {
    var data_buffer = '',
        file_name = rid();

    socket.on('data', function (data) {
        data_buffer += data;
        socket.end();
    });

    socket.on('end', function () {
        fs.writeFile(__dirname + '/logs/' + file_name, data_buffer);
        console.log('Wrote data to: ' + file_name);
    });
});

exports.server.listen(3000, function(){
    console.log('Server running at localhost:3000');
});