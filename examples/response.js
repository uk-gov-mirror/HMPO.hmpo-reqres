'use strict';

require('../test/helpers');

const router = require('express').Router();
router.route('/foo')
    .get((req, res) => {
        res.json({ user: req.session.username });
    });

const reqres = require('../');

describe('my router', () => {

    let req, res, cb;

    beforeEach(() => {
        req = reqres.req({ url: '/foo', session: { username: 'hmpo' } });
        res = reqres.res();
        cb = () => {};
    });

    it('responds with json showing user from session', (done) => {
        router.handle(req, res, cb);
        res.on('end', () => {
            res.json.should.have.been.calledWithExactly({ user: 'hmpo' });
            done();
        });
    });

});