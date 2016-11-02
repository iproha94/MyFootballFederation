import React from 'react';
import {connect} from 'react-redux';
import eventsData from './helpers/eventsData';
import * as matchActions from '../../actions/match';
import {bindActionCreators} from 'redux';
var wsUrl = require("../../../../cfg/front").wsUrl;

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
        var events = this.props.events.map(function (item, index) {
                return (
                    <li className="collection-item avatar" key={index}>
                        <img src={eventsData[item.number].image} alt="" className="circle"/>
                        <span className="title">
                            {eventsData[item.number].title}
                        </span>
                    </li>
                );
            // <p>{item.message}</p>
            // <span className="secondary-content">{item.time}</span>
            });
        return (
            <div className="card">
                {!events.length ?
                    <p className="center-align">
                        Матч еще не начался
                    </p>
                    :
                    <ul className="collection">
                        {events}
                    </ul>
                }
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        events: state.match.events,
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        matchActions: bindActionCreators(matchActions, dispatch)
    }
})(Component);