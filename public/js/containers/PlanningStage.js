import {connect} from 'react-redux';
import * as stageActions from '../actions/stage';
import {bindActionCreators} from 'redux';
var React = require('react');
var ReactDOM = require('react-dom');
var Sortable = require('sortablejs');

var Component = React.createClass({
    createNewList: function(node) {//такая штука будет работать до того, пока списки матчей пусты
        var count = 0;
        var sortable = Sortable.create(node, {
            group:  {
                name: "group",
                pull: true,
                put: function () {
                    if(count > 1){
                        return false;
                    }
                    return true;
                }
            },
            chosenClass: "sortable-chosen",
            onAdd: function (evt) {
                count++;
            },
            onRemove: function (evt) {
                count--;
            }
        });
    },
    componentDidMount: function () {
        this.props.stageActions.getTeamsInTournament(
            this.props.params.idStage
        );
    },
    componentDidUpdate: function () {
        this.createNewList(ReactDOM.findDOMNode(this.refs.left));
        for(var i=0; i < this.props.teams.length / 2; i++) {
            this.createNewList(ReactDOM.findDOMNode(this.refs["right" + i]));
        }
    },
    render: function () {
        var teams = this.props.teams.map((item, index) => {
            return <div className="collection-item" key={item.name}>
                {item.name}
            </div>;
        });

        var section = [];
        for(var i = 0; i < this.props.teams.length / 2; i++){
            section.push(
                <div className="collection match-teams-section" ref={"right" + i}></div>
            );
        }
        
        return(
            <div>
                <div className="row container">
                    <div className="col s5">
                        <div className="collection" ref="left">
                            {teams}
                        </div>
                    </div>
                    <div className="col s1"/>
                    <div className="col s5">
                        {section}
                    </div>
                </div>
            </div>
        );
    }
});

export default connect((state)=>{
    return {
        teams: state.planningStage.teams
    }
}, (dispatch)=>{
    return {
        stageActions: bindActionCreators(stageActions, dispatch)
    }
})(Component);