//import Team from '../components/Teams';
//import ModalWindow from '../components/ModalWindow';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tournamentActions from '../actions/tournamentActions';
import Teams from '../components/Teams';
import React from 'react';

var App = React.createClass({
    componentDidMount: function() {
        this.props.tournamentActions.getTournament();
    },
    render: function () {
        const { tournament, modalWindow, teams} = this.props;
        return (
           <div>
               <div className="row center">
                   Страница турнира {tournament.name}
               </div>
               <div className="row center">
                   Тип турнира: {tournament.type}
               </div>
                <Teams/>

               <div className="row right-align">
                   <a className="waves-effect waves-light btn" href="/tournament/{{tournament._id}}?setstatus=undertake">Начать турнир</a>
               </div>
           </div>
        )
    }
});


function mapStateToProps (state) {
    return {
        tournament: state.tournament,
        modalWindow: state.modalWindow,
        teams: state.teams
    }
}


function mapDispatchToProps(dispatch) {
  return {
    tournamentActions: bindActionCreators(tournamentActions, dispatch)
  }
}


//<Team teams={teams} getTournament={this.props.tournamentActions.getTournament}/>
// <ModalWindow header={modalWindow.header}
//              inputName={modalWindow.inputName}
//              teams={teams}/>

//видимо сюда нужно передавать функцию в которой возращается обьект ис именами свойств кторые нам нужны из store
export default connect(mapStateToProps, mapDispatchToProps)(App)
//подключи React компонент к Redux store.
//+ добавляет в this.props все данные из обекта mapStateToProps
// и все методы из mapDispatchToProps + метод dispatch


//похоже мы можем вызывать connect где угодно и дать возможность обращаться к любым данным и вызывать любые методы в любом из компонентов