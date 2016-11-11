import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

var Component = React.createClass({
    componentDidUpdate: function() {
        $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrain_width: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left' // Displays dropdown with edge aligned to the left of button
            }
        );
    },
    render: function () {
        var user = this.props.currentUser;
        var isAuthenticated = !!user._id;
        var linkAccountPage = isAuthenticated ? "/account/" + user._id : null;
        return (
            <nav className="light-green darken-2 header-position" role="navigation">
                <ul id="dropdown1" className="dropdown-content">
                    <li><Link to={linkAccountPage}>Страница профиля</Link></li>
                    <li className="divider"></li>
                    <li><a href="/logout">Выйти</a></li>
                </ul>

                <ul id='dropdown2' className='dropdown-content'>
                    <li><Link to="/users">Пользователи</Link></li>
                </ul>

                <div className="nav-wrapper container">
                    <Link id="logo-container" to="/" className="brand-logo">
                        <img src="/img/logo.png" className="logo-image"/>
                            iFootball
                    </Link>

                    <ul className="right hide-on-med-and-down">
                        {isAuthenticated ?
                            [
                                <li><a className="dropdown-button" data-beloworigin="true" href="#!" data-activates="dropdown1">Профиль<i className="material-icons right">arrow_drop_down</i></a></li>,
                                <li><a className="dropdown-button" data-beloworigin="true" href="#!" data-activates="dropdown2">Ресурсы<i className="material-icons right">arrow_drop_down</i></a></li>
                            ]
                            :
                            [
                                <li>Войти через:&nbsp;&nbsp;</li>,
                                <li><a className="" href={"/auth/vkontakte?redirect=" + this.props.location.pathname}><i className="fa fa-vk fa-lg vertical-align-middle" aria-hidden="true"></i></a></li>,
                                <li><a className="" href="#"><i className="fa fa-google-plus fa-lg vertical-align-middle" aria-hidden="true"></i></a></li>
                            ]}
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

                        {isAuthenticated ?
                            (<li><Link className="waves-effect" to={linkAccountPage}><i className="fa fa-futbol-o fa-lg" aria-hidden="true"></i>Профиль</Link></li>)
                        :
                            [
                            <li><a className="subheader">Войти через:</a></li>,
                            <li><a className="waves-effect" href={"/auth/vkontakte?redirect=" + this.props.location.pathname}><i className="fa fa-vk fa-lg" aria-hidden="true"></i>Вконтакте</a></li>,
                            <li><a className="waves-effect" href="#"><i className="fa fa-google-plus fa-lg" aria-hidden="true"></i>Google</a></li>,
                        ]}
                        <li><div className="divider"></div></li>
                        <li><a className="subheader">Дополнительно</a></li>
                        {isAuthenticated ? [
                        <li><Link className="waves-effect" to="/users"><i className="fa fa-users fa-lg" aria-hidden="true"></i>Пользователи</Link></li>,
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

