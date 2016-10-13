import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tournamentActions from '../actions/tournament/tournament';
import * as teamActions from '../actions/team/teams';
import Teams from '../components/tournament/Teams';
import ModalWindow from '../components/tournament/ModalWindow';
import Matches from '../components/tournament/Matches';

var TournamentPage = React.createClass({
    componentDidMount: function() {
        this.props.tournamentActions.getTournamentPageInfo();
    },
    render: function () {
        const {tournament} = this.props;
        var content = (
            <div>
                <Teams/>
                <ModalWindow inputName="inputName"
                             header="header"/>
                <div className="row right-align">
                    <a className="waves-effect waves-light btn" href={"/tournament/"+ tournament._id + "?setstatus=undertake"}>Начать турнир</a>
                </div>
            </div>
        );
        if(this.props.matches.length == 0) {
            content = <Matches/>
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
        matches: state.matchList
    }
}, (dispatch)=>{
    return {
        tournamentActions: bindActionCreators(tournamentActions, dispatch),
        teamActions: bindActionCreators(teamActions, dispatch)
    }
})(TournamentPage);
//подключаем React компонент к Redux store. =>
//добавляет в this.props все данные из обекта mapStateToProps
//и все методы из mapDispatchToProps + метод dispatch
//таким образом с помощью этого метода можно добавить
// в любой компонент нужные данные из store