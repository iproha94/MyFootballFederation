import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import NavBarSearch from './Search/NavBarSearch';
import NavSideSearch from './Search/NavSideSearch';
import CreateTeamButton from '../leftMenu/CreateTeamButton';
import CreateFederationButton from '../leftMenu/CreateFederationButton';
import * as accountActions from '../../actions/user';


var Component = React.createClass({
    componentDidMount: function () {
        $('.button-collapse').sideNav({
                closeOnClick: true // Closes side-nav on <a> clicks
        });
    },
    render: function () {
        var federations = this.props.federations.map((item) => {
            return (
                <li><Link className="waves-effect" to={`/federation/${item.name}`}>{item.name}</Link></li>
            )
        });

        var teams = this.props.teams.map((item) => {
            return (
                <li><Link className="waves-effect" to={`/team/${item._id}`}>{item.name}</Link></li>
            )
        });

        var redirectUrl = this.props.location.pathname;
        var user = this.props.currentUser;
        var isAuthenticated = !!user._id;
        var linkAccountPage = isAuthenticated ? "/account/" + user._id : null;
        return (
            <nav className="light-green darken-2 header-position" role="navigation">
                <div className="truncate nav-wrapper container">
                    <Link id="logo-container" to="/" className="brand-logo">
                        <img src="/img/logo.png" className="logo-image"/>
                        Footman
                    </Link>

                    <ul className="right hide-on-med-and-down">
                        {isAuthenticated ? [
                            <li><Link to={linkAccountPage}>Профиль</Link></li>,
                            <li><a href={`/logout/?redirect=${redirectUrl}`}>Выйти</a></li>
                        ] :
                            <li><a id="vk-auth-btn"
                                   className="waves-effect waves-light btn vk-color"
                                   href={`/auth/vkontakte/?redirect=${redirectUrl}`}>
                                    Войти через VK
                                </a>
                            </li>
                        }
                    </ul>

                    <ul id="slide-out" className="side-nav">
                        <li>
                            <div className="userView">
                                <img className="background" src="/img/side-nav.jpg"/>
                                <Link to={linkAccountPage}>
                                    <img className="circle" src={this.props.currentUser.image}/>
                                </Link>
                                <Link to={linkAccountPage}>
                                    <span className="white-text name">
                                        {isAuthenticated ? user.name : "Аноним"}
                                    </span>
                                </Link>
                                <br/>
                            </div>
                        </li>

                        <li>
                            <NavSideSearch history={this.props.history}
                                           url="/federation/"
                                           placeholder="Поиск федераций"/>
                        </li>

                        {isAuthenticated ? (
                            <li><Link className="waves-effect" to={linkAccountPage}><i className="fa fa-futbol-o fa-lg" aria-hidden="true"></i>Профиль</Link></li>
                        ) : [
                            <li><a className="subheader">Войти через:</a></li>,
                            <li><a className="waves-effect"
                                   href={`/auth/vkontakte/?redirect=${redirectUrl}`}>
                                    <i className="fa fa-vk fa-lg" aria-hidden="true"></i>
                                    Вконтакте
                                </a>
                            </li>
                        ]}

                        {!isAuthenticated ? null : [
                            <li><div className="divider"></div></li>,
                            <li><a className="subheader">Ваши федерации:</a></li>,
                            federations.length ? federations : "Тут будут ваши федерации",
                            <li><CreateFederationButton/></li>,
                                
                            <li><a className="subheader">Ваши команды:</a></li>,
                            teams.length ? teams : "Тут будут ваши команды",
                            <li><CreateTeamButton/></li>

                            ]}

                        <li><div className="divider"></div></li>
                        <li><a className="subheader">Дополнительно</a></li>

                        {isAuthenticated ? [
                            <li><a className="waves-effect"
                                   href={`/logout/?redirect=${redirectUrl}`} >
                                    <i className="fa fa-bed fa-lg" aria-hidden="true"></i>
                                    Выйти
                                </a>
                            </li>
                        ] : (
                            <li><a className="waves-effect"
                                   href="#!">
                                    <i className="fa fa-coffee fa-lg" aria-hidden="true"></i>
                                    Для соблюдения material
                                </a>
                            </li>
                        )}
                    </ul>

                    <a href="#" data-activates="slide-out" className="button-collapse">
                        <i className="material-icons">menu</i>
                    </a>

                    <NavBarSearch history={this.props.history}
                                  url="/federation/"
                                  placeholder="Поиск федераций"/>
                </div>
            </nav>
        )
    }
});

export default connect((state)=>{
    return {
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        accountActions: bindActionCreators(accountActions, dispatch)
    }
})(Component);