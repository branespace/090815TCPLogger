"use strict";

var chai = require('chai'),
    expect = require('chai').expect,
    chaihttp = require('chai-http'),
    server = require('./../server'),
    fs = require('fs'),
    res,
    err,
    beforeDir,
    afterDir;

chai.use(chaihttp);

describe('tcp server', function () {
    before(function(done){
        beforeDir = fs.readdirSync(__dirname + '/../logs');
        chai.request('localhost:3000')
            .post('/')
            .send({name: 'greg'})
            .end(function (err, response) {
                res = response;
                done();
            });
    });
    it('should write a file', function () {
        afterDir = fs.readdirSync(__dirname + '/../logs');
        expect(afterDir.length).to.be.greaterThan(beforeDir.length);
    });
});