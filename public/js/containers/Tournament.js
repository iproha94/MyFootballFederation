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
        this.props.tournamentActions.getTournament(_id);
        this.props.teamActions.getTeamsByTournament(_id);
        this.props.stagesActions.getStages(_id);
    },
    onSuccessAddTeam: function () {
        this.props.teamActions
            .getTeamsByTournament(this.props.params.idTournament);
    },
    render: function () {
        const {tournament} = this.props;
        var isAuth = !!this.props.currentUser._id;
        return (
            <div className="container content-flex js-content-place">
               <div className="row center">
                   Страница турнира {tournament.name}
               </div>
               <div className="row center">
                   Тип турнира: {tournament.type}
               </div>

                <List header="Список заявок команд:"
                      url="/team/"
                      defaultMessage="Заявок от команд нет"
                      list={this.props.teams}/>

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

                {!isAuth ? null :
                    <ModalWindow urlSend="/api/tournament/add-team"
                                 buttonName="Подать заявку от лица команды"
                                 header="Список команд"
                                 nameHiddenInput="idTournament"
                                 valueArray={this.props.currentUser.teams}
                                 valueHiddenInput={tournament._id}
                                 onSuccess={this.onSuccessAddTeam}/>
                }
                
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