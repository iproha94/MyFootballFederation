process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

var User = require('../models/user');
var Match = require('../models/match');
var Stage = require('../models/stage');
var Tournament = require('../models/tournament');
var Team = require('../models/team');
var Vuser = require('../models/vuser');
var Federation = require('../models/federation');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app').app;

let should = chai.should();
let expect = require('chai').expect;

chai.use(chaiHttp);

describe('Referee API', () => {
    beforeEach((done) => {
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
                done();
            })
    });

    describe('/get-my-matches', () => {
        it('it should get matches by the given user id', (done) => {
            let federation = new Federation({
                name: "my_federation"
            });

            let tournament = new Tournament({
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

            let stage = new Stage({
                name: "my_stage",
                federation: federation.id,
                tournament: tournament.id
            });

            let team1 = new Team({
                name: "my_team1",
                vplayers: [],
            });

            let vuser11 = new Vuser({name: "my_vuser11"});
            team1.vplayers.push(vuser11.id);

            let vuser12 = new Vuser({name: "my_vuser12"});
            team1.vplayers.push(vuser12.id);

            let team2 = new Team({
                name: "my_team2",
                vplayers: [],
            });

            let vuser21 = new Vuser({name: "my_vuser21"});
            team2.vplayers.push(vuser21.id);

            let vuser22 = new Vuser({name: "my_vuser22"});
            team2.vplayers.push(vuser22.id);

            let match = new Match({
                team1: team1.id,
                team2: team2.id,
                stage: stage.id,
                federation: federation.id,
                status: Match.STATUS.CREATED.name
            });

            let idVk = "my_authId";
            let user = new User({
                name: "my_name",
                authId: "vkontakte:" + idVk,
                matchesToReferee: []
            });
            user.matchesToReferee.push(match.id);

            federation.save()
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
                    chai.request(app)
                        .post('/api-referee/get-my-matches')
                        .send({idVk: idVk})
                        .end((err, res) => {
                            res.should.have.status(200);
                            expect(res.body).to.have.lengthOf(1);
                            res.body[0].should.have.property('idMatch').eql(match.id);
                            done();
                        });
                })
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

});