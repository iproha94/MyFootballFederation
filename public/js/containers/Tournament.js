import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tournamentActions from '../actions/tournament';
import * as stageActions from '../actions/stage';
import * as teamActions from '../actions/team';
import List from '../components/common/List';
import TeamsList from '../components/tournament/TeamsList';
import CreateStage from '../components/tournament/CreateStage';
import TeamsWindow from '../components/tournament/TeamsWindow';
import StageListWithMathes from '../components/tournament/StageListWithMathes';

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
                <div className="col s12 card padding-disabled">
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
                            <CreateStage tournamentId={this.props.tournament._id}/>
                    }
                </div>

                <div id="matches" className="col s12 padding-disabled">
                    <StageListWithMathes stages={this.props.stages}/>
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