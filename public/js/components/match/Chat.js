import React from 'react';
import * as matchActions from '../../actions/match';
var chatUrl = require("../../../../cfg/front").chatUrl;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';


function getCurrentTime() {
    if(!Date.prototype.today || !Date.prototype.timeNow) {
        // For todays date;
        Date.prototype.today = function () {
            return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "." + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "." + this.getFullYear();
        };

        // For the time now
        Date.prototype.timeNow = function () {
            return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
        };
    }

    var newDate = new Date();
    return newDate.timeNow() + " " + newDate.today();
}

var Component = React.createClass({
    onsubmit: function (event) {
        event.preventDefault();
        var outgoingMessage = event.target.message.value;

        this.ws.send(JSON.stringify({
            type: "message",
            message: outgoingMessage,
            time: getCurrentTime()
        }));

        event.target.reset();
    },
    startChat : function () {//TODO проверить работу (offline режим в хроме не запрещает обращения к серверу на локалке)
        // создать подключение
        this.ws = new WebSocket(chatUrl);

        // обработчик входящих сообщений
        this.ws.onmessage = (event) => {
            var incomingMessage = JSON.parse(event.data);
            this.props.matchActions.addMessageInChat(incomingMessage);
        };

        this.ws.onopen = () => {
            console.log("onopen");
            this.ws.send(JSON.stringify({
                type: "start",
                idMatch: this.props.idMatch
            }));
        };

        this.ws.onclose = (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения'); // например, "убит" процесс сервера
                setTimeout(() => {
                    this.startChat();
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
        this.startChat();
    },
    render: function () {
        console.log(this.props.match);
        var messages = this.props.match//нужно что то умнее придумать
            .chat.slice(0).reverse().map(function (item, index) {
            return (
                <li className="collection-item avatar" key={index}>
                    <Link to={`/account/${item.user._id}`}>
                        <img src={item.user.image} alt="" className="circle"/>
                    </Link>
                    <span className="title">
                        <Link to={`/account/${item.user._id}`}>{item.user.name}</Link>
                    </span>
                    <p>{item.message}</p>

                    <span className="secondary-content">{item.time}</span>
                </li>
            )
        });
        return (
            <div className="card">
                {/* форма для отправки сообщений */}
                <form name="publish" className="chat-padding" onSubmit={this.onsubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="text" name="message" className="validate"/>
                                <label for="email">Ваше сообщение</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Отправить
                        <i className="material-icons right">send</i>
                    </button>
                </form>

                <ul className="collection">
                    {messages}
                </ul>
                {/* здесь будут появляться входящие сообщения */}
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