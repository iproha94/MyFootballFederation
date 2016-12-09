process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

var User = require('../../models/user');
var Match = require('../../models/match');
var Stage = require('../../models/stage');
var Tournament = require('../../models/tournament');
var Team = require('../../models/team');
var Vuser = require('../../models/vuser');
var Federation = require('../../models/federation');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app').app;

let should = chai.should();
let expect = require('chai').expect;

chai.use(chaiHttp);

describe('API Referee', () => {
    let federation;
    let tournament;
    let stage;
    let team1;
    let team2;
    let vuser11;
    let vuser12;
    let vuser21;
    let vuser22;
    let match;
    let user;
    let idVk = "my_authId";

    before((done) => {
        User.remove()
            .then(() => {
                return Match.remove();
            })
            .then(() => {
                return Stage.remove();
            })
            .then(() => {
                return Tournament.remove();
            })
            .then(() => {
                return Team.remove();
            })
            .then(() => {
                return Vuser.remove();
            })
            .then(() => {
                return Federation.remove();
            })
            .then(() => {
                federation = new Federation({
                    name: "my_federation"
                });

                tournament = new Tournament({
                    name: "my_tournament",
                    federation: federation.id,
                    tournamentConfig: {
                        countPlayersInTeam: 10,
                        countPlayersOnField: 20,
                    },
                    matchConfig: {
                        timePeriod: 30,
                        countPeriods: 40,
                    }
                });

                stage = new Stage({
                    name: "my_stage",
                    federation: federation.id,
                    tournament: tournament.id
                });

                team1 = new Team({
                    name: "my_team1",
                    vplayers: [],
                });

                vuser11 = new Vuser({name: "my_vuser11"});
                team1.vplayers.push(vuser11.id);

                vuser12 = new Vuser({name: "my_vuser12"});
                team1.vplayers.push(vuser12.id);

                team2 = new Team({
                    name: "my_team2",
                    vplayers: [],
                });

                vuser21 = new Vuser({name: "my_vuser21"});
                team2.vplayers.push(vuser21.id);

                vuser22 = new Vuser({name: "my_vuser22"});
                team2.vplayers.push(vuser22.id);

                match = new Match({
                    team1: team1.id,
                    team2: team2.id,
                    stage: stage.id,
                    federation: federation.id,
                    status: Match.STATUS.CREATED.name
                });

                user = new User({
                    name: "my_name",
                    authId: "vkontakte:" + idVk,
                    matchesToReferee: []
                });
                user.matchesToReferee.push(match.id);

                return federation.save()
            })
            .then(() => {
                return tournament.save();
            })
            .then(() => {
                return stage.save();
            })
            .then(() => {
                return vuser11.save();
            })
            .then(() => {
                return vuser12.save();
            })
            .then(() => {
                return vuser21.save();
            })
            .then(() => {
                return vuser22.save();
            })
            .then(() => {
                return team1.save();
            })
            .then(() => {
                return team2.save();
            })
            .then(() => {
                return match.save();
            })
            .then(() => {
                return user.save();
            })
            .then(() => {
                done();
            })
    });

    describe('/get-my-matches', () => {

        it('it should get matches by the given user id', (done) => {
            chai.request(app)
                .post('/api-referee/get-my-matches')
                .send({idVk: idVk})
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.have.lengthOf(1);
                    res.body[0].should.have.property('idMatch').eql(match.id);
                    done();
                });
        });

        it('it should get empty matches by the given not exist user id', (done) => {
            chai.request(app)
                .post('/api-referee/get-my-matches')
                .send({idVk: "---"})
                .end((err, res) => {
                    res.should.have.status(404);
                    expect(res.body).to.have.lengthOf(0);
                    done();
                });
        });

        it('it should get bad request', (done) => {
            chai.request(app)
                .post('/api-referee/get-my-matches')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/set-info', () => {

        it('it should match.status == Match.STATUS.RUNNING.name by set event MATCH_STARTED', (done) => {
            let event = {
                idMatch: match.id,
                idEvent: Match.EVENT.MATCH_STARTED.name,
                idAction: 0,
                minute: 0
            };

            chai.request(app)
                .post('/api-referee/set-info')
                .send(event)
                .end((err, res) => {
                    res.should.have.status(200);

                    Match.findById(match.id, function (err, match) {
                        expect(err || !match).to.be.false;

                        expect(match.status).to.equal(Match.STATUS.RUNNING.name);
                        done();
                    });

                });
        });

        it('it should match.status == Match.STATUS.FINISHED.name by set event MATCH_FINISHED', (done) => {
            let event = {
                idMatch: match.id,
                idEvent: Match.EVENT.MATCH_FINISHED.name,
                idAction: 0,
                minute: 0
            };

            chai.request(app)
                .post('/api-referee/set-info')
                .send(event)
                .end((err, res) => {
                    res.should.have.status(200);

                    Match.findById(match.id, function (err, match) {
                        expect(err || !match).to.be.false;
                        expect(match.status).to.equal(Match.STATUS.FINISHED.name);
                        done();
                    });

                });
        });

        it('it should get NOT FOUND by the given not exist match id', (done) => {
            let event = {
                idMatch: "---",
                idEvent: "---",
                idAction: 0,
                minute: 0
            };

            chai.request(app)
                .post('/api-referee/set-info')
                .send(event)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should get bad request', (done) => {
            chai.request(app)
                .post('/api-referee/set-info')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});