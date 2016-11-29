import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stageActions from '../actions/stage';
import * as matchActions from '../actions/match';
import List from '../components/common/List';
import {Link} from 'react-router'

var Component = React.createClass({
    componentDidMount: function() {
        this.props.stageActions.getStage(this.props.params.idStage);
        this.props.matchActions.getMatchesInStage(this.props.params.idStage);
    },
    onStart: function (event) {
        $.ajax({
            url: "/api" + location.pathname + "/start",
            success: (data) => {
                Materialize.toast("Операция прошла успешно", 2000);
                this.props.matchActions.getMatchesInStage(this.props.params.idStage);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        const stage = this.props.stage;

        return (
            <div className="container content-margin-top content-flex">

                <div className="row center">
                    <h3>Страница стадии {stage.name}</h3>
                </div>

                <div className="container content-margin-top content-flex">
                    <ul className="collection with-header">
                        <li className="collection-header center"><h5>Парметры этапа</h5></li>

                        <li className="collection-item">Тип: {stage.type.name}</li>
                    </ul>
                </div>
                {!(this.props.stage.isAdmin && !this.props.matches.length) ? null :
                    <div className="row right-align">
                        <a className="waves-effect waves-light btn" onClick={this.onStart} href="#">
                            Начать со всемизаявившимися командами
                        </a>

                        <Link className="waves-effect waves-light btn" to={`/stage/${this.props.stage._id}/planning`}>
                            Ручное создание
                        </Link>
                    </div>
                }

                <List header="Список матчей:"
                      url="/match/"
                      defaultMessage="В этапе нет матчей"
                      list={this.props.matches}/>
            </div>
        );
    }
});

export default connect((state)=>{
    return {
        stage: state.stage,
        matches: state.stage.matches
    }
}, (dispatch)=>{
    return {
        stageActions: bindActionCreators(stageActions, dispatch),
        matchActions: bindActionCreators(matchActions, dispatch)
    }
})(Component);