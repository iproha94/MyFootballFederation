import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tournamentActions from '../actions/tournament';
import * as stageActions from '../actions/stage';
import * as teamActions from '../actions/team';
import List from '../components/common/List';
import {Link} from 'react-router';
import ModalWindow from '../components/common/ModalWindow';

var TournamentPage = React.createClass({
    idTournament: null,
    componentDidMount: function() {
        var _id = this.props.params.idTournament;
        this.idTournament = _id;
        this.props.tournamentActions.getTournament(_id);
        this.props.teamActions.getTeamsByTournament(_id);
        this.props.teamActions.getTeams();
        this.props.stagesActions.getStages(_id);
    },
    onSuccessAddTeam: function () {
        this.props.teamActions.getTeamsByTournament(this.idTournament);
    },
    render: function () {
        const {tournament} = this.props;
        var content = (
            <div>
                <List header="Список заявок команд:"
                      url="/team/"
                      defaultMessage="Заявок от команд нет"
                      list={this.props.teams}/>
                
                <List header="Список этапов:"
                      url="/stage/"
                      defaultMessage="В турнире нет этапов"
                      list={this.props.stages}/>


                <div className="row right-align">
                    <Link className="waves-effect waves-light btn"
                          to={"/stage/create/?tournament=" + this.props.tournament._id}>
                        Создать этап
                    </Link>
                </div>

                <ModalWindow urlSend="/api/tournament/add-team"
                             buttonName="Подать заявку от лица команды"
                             header="Список команд"
                             nameHiddenInput="idTournament"
                             valueArray={this.props.teamsCurrentUser}
                             valueHiddenInput={tournament._id}
                             onSuccess={this.onSuccessAddTeam}/>
                
                <div className="row right-align">
                    <Link className="waves-effect waves-light btn"
                          to={"/tournament/"+ tournament._id + "?setstatus=undertake"}>Начать турнир</Link>
                </div>
            </div>
        );
        //тут нужно проверять какую то галочку о том что матч начался
        //но я не знаю какую
        if(this.props.matches.length != 0) {
            content = <List header="Список матчей"
                        url="/match/"
                        defaultMessage="Матчей нет"
                        list={this.props.matches}/>
        }

        return (
            <div className="container content-margin-top content-flex js-content-place">
               <div className="row center">
                   Страница турнира {tournament.name}
               </div>
               <div className="row center">
                   Тип турнира: {tournament.type}
               </div>
                {content}
           </div>
        )
    }
});

export default connect((state)=>{
    return {
        tournament: state.tournament,
        modalWindow: state.modalWindow,
        teams: state.teamsTournament,
        teamsCurrentUser: state.teams,
        matches: state.matchList,
        stages: state.stages
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