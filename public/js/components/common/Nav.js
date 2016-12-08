import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Search from './Search';

var Component = React.createClass({
    render: function () {
        var user = this.props.currentUser;
        var isAuthenticated = !!user._id;
        var linkAccountPage = isAuthenticated ? "/account/" + user._id : null;
        return (
            <nav className="light-green darken-2 header-position" role="navigation">
                <div className="truncate nav-wrapper container">
                    <Link id="logo-container" to="/" className="brand-logo">
                        <img src="/img/logo.png" className="logo-image"/>
                        Матчи online
                    </Link>

                    <ul className="right hide-on-med-and-down">
                        {isAuthenticated ? [
                            <li><Link to={linkAccountPage}>Профиль</Link></li>,
                            <li><a href="/logout">Выйти</a></li>
                        ] :
                            <li><a id="vk-auth-btn" className="waves-effect waves-light btn vk-color" href={"/auth/vkontakte?redirect=" + this.props.location.pathname}>Войти через VK</a></li>
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

                        {isAuthenticated ? (
                            <li><Link className="waves-effect" to={linkAccountPage}><i className="fa fa-futbol-o fa-lg" aria-hidden="true"></i>Профиль</Link></li>
                        ) : [
                            <li><a className="subheader">Войти через:</a></li>,
                            <li><a className="waves-effect" href={"/auth/vkontakte?redirect=" + this.props.location.pathname}><i className="fa fa-vk fa-lg" aria-hidden="true"></i>Вконтакте</a></li>
                        ]}

                        <li><div className="divider"></div></li>
                        <li><a className="subheader">Дополнительно</a></li>

                        {isAuthenticated ? [
                            <li><a className="waves-effect" href="/logout"><i className="fa fa-bed fa-lg" aria-hidden="true"></i>Выйти</a></li>
                        ] : (
                            <li><a className="waves-effect" href="#!"><i className="fa fa-coffee fa-lg" aria-hidden="true"></i>Для соблюдения material</a></li>
                        )}
                    </ul>

                    <a href="#" data-activates="slide-out" className="button-collapse">
                        <i className="material-icons">menu</i>
                    </a>

                    <Search classes="federation-search right hide-on-med-and-down"
                            history={this.props.history}
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
})(Component);

