import React from 'react';
import {connect} from 'react-redux';

var Component = React.createClass({
    render: function () {
        var user = this.props.currentUser;
        var isAuthenticated = !!user._id;
        return (
            <nav className="light-green darken-2 header-position" role="navigation">
                <ul id="dropdown1" className="dropdown-content">
                    <li><a href="/account">Страница профиля</a></li>
                    <li className="divider"></li>
                    <li><a href="/logout">Выйти</a></li>
                </ul>

                <ul id='dropdown2' className='dropdown-content'>
                    <li><a href="/users">Пользователи</a></li>
                </ul>

                <div className="nav-wrapper container">
                    <a id="logo-container" href="/" className="brand-logo">
                        <img src="/img/logo.png" className="logo-image"/>
                            iFootball
                    </a>

                    <ul className="right hide-on-med-and-down">
                        {isAuthenticated ?
                            [
                                <li><a className="dropdown-button" data-beloworigin="true" href="#!" data-activates="dropdown1">Профиль<i className="material-icons right">arrow_drop_down</i></a></li>,
                                <li><a className="dropdown-button" data-beloworigin="true" href="#!" data-activates="dropdown2">Ресурсы<i className="material-icons right">arrow_drop_down</i></a></li>
                            ]
                            :
                            [
                                <li>Войти через:&nbsp;&nbsp;</li>,
                                <li><a className="" href="/auth/vkontakte/callback"><i className="fa fa-vk fa-lg vertical-align-middle" aria-hidden="true"></i></a></li>,
                                <li><a className="" href="#"><i className="fa fa-google-plus fa-lg vertical-align-middle" aria-hidden="true"></i></a></li>
                            ]}
                    </ul>

                    <ul id="slide-out" className="side-nav">
                        <li>
                            <div className="userView">
                                <img className="background" src="http://unsplash.it/400/200?image=527"/>
                                    <a href="/account">
                                        <img className="circle" src="{{default user.image '/img/camera.png'}}"/>
                                    </a>
                                    <a href="/account">
                    <span className="white-text name">
                        {isAuthenticated ? user.name : "Аноним"}
                    </span>
                                    </a>
                                    <br/>
                            </div>
                        </li>

                        {isAuthenticated ?
                            (<li><a className="waves-effect" href="/account"><i className="fa fa-futbol-o fa-lg" aria-hidden="true"></i>Профиль</a></li>)
                        :
                            [
                            <li><a className="subheader">Войти через:</a></li>,
                            <li><a className="waves-effect" href="/auth/vkontakte/callback"><i className="fa fa-vk fa-lg" aria-hidden="true"></i>Вконтакте</a></li>,
                            <li><a className="waves-effect" href="#"><i className="fa fa-google-plus fa-lg" aria-hidden="true"></i>Google</a></li>,
                        ]}
                        <li><div className="divider"></div></li>
                        <li><a className="subheader">Дополнительно</a></li>
                        {isAuthenticated ? [
                        <li><a className="waves-effect" href="/users"><i className="fa fa-users fa-lg" aria-hidden="true"></i>Пользователи</a></li>,
                        <li><a className="waves-effect" href="/logout"><i className="fa fa-bed fa-lg" aria-hidden="true"></i>Выйти</a></li>

                        ] :(
                        <li><a className="waves-effect" href="#!"><i className="fa fa-coffee fa-lg" aria-hidden="true"></i>Для соблюдения material</a></li>
                        )}
                    </ul>

                    <a href="#" data-activates="slide-out" className="button-collapse">
                        <i className="material-icons">menu</i>
                    </a>
                </div>
            </nav> 
        )
    }
});

export default connect((state)=>{
    return {
        currentUser: state.currentUser
    }
})(Component);