process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let should = chai.should();

let Vuser = require('../../models/vuser');

let app = require('../../app').app;


describe('API Vuser', () => {
    beforeEach((done) => {
        Vuser.remove()
            .then(() => {
                done();
            })
    });

    describe('/get', () => {
        it('it should get a vuser by the given id', (done) => {
            let vuser = new Vuser({name: "Ilya Petukhov"});

            vuser.save()
                .then(() => {
                    chai.request(app)
                        .post('/api/vuser/get')
                        .send({id: vuser.id})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('name').eql(vuser.name);
                            res.body.should.have.property('_id').eql(vuser.id);
                            done();
                        });
                })
        });

        it('it should get 404 (not found) by not exist id', (done) => {
            chai.request(app)
                .post('/api/vuser/get')
                .send({id: '---'})
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should get 400 (bad query)', (done) => {
            chai.request(app)
                .post('/api/vuser/get')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

});