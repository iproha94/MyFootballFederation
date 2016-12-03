import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tournamentActions from '../actions/tournament';
import * as stageActions from '../actions/stage';
import * as teamActions from '../actions/team';
import List from '../components/common/List';
import TeamsList from '../components/tournament/TeamsList';
import {Link} from 'react-router';
import TeamsWindow from '../components/tournament/TeamsWindow';

var TournamentPage = React.createClass({
    idTournament: null,
    componentDidMount: function() {
        $('ul.tabs').tabs();
        var _id = this.props.params.idTournament;
        this.props.tournamentActions.getTournament(_id);
        this.props.teamActions.getTeamsByTournament(_id);
        this.props.stagesActions.getStages(_id);
    },

    render: function () {
        const {tournament} = this.props;
        var isAuth = !this.props.currentUser._id;
        return (
            <div className="row">
                <div className="col s12 card padding-enabled">
                    <div className="card-image">
                        <img src="/img/tournament-default-banner.jpg"/>
                        <span className="card-title tournament_card-title">
                            Страница турнира {tournament.name}
                        </span>
                    </div>

                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s4"><a href="#team-request">Заявки команд</a></li>
                        <li className="tab col s4"><a href="#stages">Этапы</a></li>
                        <li className="tab col s4"><a href="#matches">Матчи</a></li>
                    </ul>
                </div>

                <div id="team-request" className="col s12 card">
                    <TeamsList list={this.props.teams}/>

                    {isAuth ? null :
                        <TeamsWindow teams={this.props.currentUser.teams}
                                     tournamentId={tournament._id}
                                     teamActions={this.props.teamActions}/>
                    }

                </div>

                <div id="stages" className="col s12 card">
                    <List header="Список этапов:"
                          url="/stage/"
                          defaultMessage="В турнире нет этапов"
                          list={this.props.stages}/>

                    {!this.props.tournament.isAdmin ? null :
                        <div className="row right-align">
                            <Link className="waves-effect waves-light btn"
                                  to={"/stage/create/?tournament=" + this.props.tournament._id}>
                                Создать этап
                            </Link>
                        </div>
                    }
                </div>

                <div id="matches" className="col s12 card">
                    тут будет список матчей
                </div>
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        tournament: state.tournament,
        teams: state.tournament.teams,
        stages: state.tournament.stages,
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        tournamentActions: bindActionCreators(tournamentActions, dispatch),
        teamActions: bindActionCreators(teamActions, dispatch),
        stagesActions: bindActionCreators(stageActions, dispatch)
    }
})(TournamentPage);
//подключаем React компонент к Redux store. =>
//добавляет в this.props все данные из обекта mapStateToProps
//и все методы из mapDispatchToProps + метод dispatch
//таким образом с помощью этого метода можно добавить
// в любой компонент нужные данные из store