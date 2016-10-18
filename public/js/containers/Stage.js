import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tournamentActions from '../actions/tournament';
import * as stageActions from '../actions/stage';
import * as matchActions from '../actions/match';
import List from '../components/common/List';
import {Link} from 'react-router';
import ModalWindow from '../components/common/ModalWindow';

var Component = React.createClass({
    componentDidMount: function() {
        this.props.stageActions.getStage(this.props.params.idStage);
        this.props.matchActions.getMatchesInStage(this.props.params.idStage);
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

                <div className="row right-align">
                    <a className="waves-effect waves-light btn" href="{{stage._id}}\start">Начать со всеми заявившимися командами</a>
                </div>


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
        matches: state.matchList
    }
}, (dispatch)=>{
    return {
        stageActions: bindActionCreators(stageActions, dispatch),
        matchAction: bindActionCreators(matchActions, dispatch),

    }
})(Component);