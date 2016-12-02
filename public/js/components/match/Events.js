import React from 'react';
import {connect} from 'react-redux';
import * as matchActions from '../../actions/match';
import {bindActionCreators} from 'redux';
var wsUrl = require("../../../../cfg/front").wsUrl;
var eventsData = require('../../../../cfg/matchEvents');

var Component = React.createClass({
    createWS : function () {//TODO проверить работу (offline режим в хроме не запрещает обращения к серверу на локалке)
        // создать подключение
        this.ws = new WebSocket(wsUrl);

        // обработчик входящих сообщений
        this.ws.onmessage = (event) => {
            var incomingMessage = JSON.parse(event.data);
            this.props.matchActions.addEventInLog(incomingMessage);
        };

        this.ws.onclose = (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения'); // например, "убит" процесс сервера
                setTimeout(() => {
                    this.createWS();
                    //TODO надо запросить у сервера только список комментов(пока соединение было разорвано могло наприходить сообщений)
                    this.props.matchActions.getMatch(this.props.match.match.id);
                }, 5000);//5 секунд
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };

        this.ws.onerror = function(error) {
            console.log("Ошибка " + error.message);
        };
    },
    componentDidMount: function() {
        this.createWS();
    },
    componentWillUnmount: function () {
        if(this.ws){
            this.ws.close();
        }
    },
    render: function () {
        var events = this.props.match.events.map(function (item, index) {
            var event = eventsData[item.idEvent];

            return (
                <li className="collection-item avatar" key={index}>
                    <img src={event.image} alt="" className="circle"/>
                    <span className="title">
                        {event.title}
                    </span>
                    <p> {item.idPlayer ? `Игрoк: ${item.playerName} ` : null}</p>
                    <p> {item.idTeam ? `Команда: ${item.teamName}` : null}</p>

                    <span className="secondary-content">Минута: {item.minute}; Время: {new Date(item.realTime).toLocaleTimeString()}</span>
                </li>
            );
        });

        let numGoalsTeam1 = 0;
        let numGoalsTeam2 = 0;

        let idTeam1 = this.props.match.team1._id;
        let idTeam2 = this.props.match.team2._id;

        this.props.match.events.forEach(function (item) {
            if (item.idEvent == eventsData.GOAL.name && item.idTeam == idTeam1) numGoalsTeam1++;
            if (item.idEvent == eventsData.GOAL.name && item.idTeam == idTeam2) numGoalsTeam2++;

            if (item.idEvent == eventsData.OWN_GOAL.name && item.idTeam == idTeam1) numGoalsTeam2++;
            if (item.idEvent == eventsData.OWN_GOAL.name && item.idTeam == idTeam2) numGoalsTeam1++;

        });

        return (
            <div>
                <h5 className="center"> {events.length != 0 ? "Матч прошел " + new Date(this.props.match.events[0].realTime).toLocaleDateString() : ""} </h5>
                <h4 className="center"> {events.length != 0 ? "Счет " + numGoalsTeam1 + ":" + numGoalsTeam2 : ""} </h4>

                {events.length ?
                    <ul className="collection">
                        {events.reverse()}
                    </ul>
                    :
                    <h5>Матч еще не начался</h5>
                }
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        match: state.match,
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        matchActions: bindActionCreators(matchActions, dispatch)
    }
})(Component);