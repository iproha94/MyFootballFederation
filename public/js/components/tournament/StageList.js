import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    componentDidMount: function(){
        $('.collapsible').collapsible();
    },
    getInitialState: function() {
        return {openedStage: ''};
    },
    triggerCollapsible: function(idStage) {
        var self = this;
        return function (event) {
            if(!self.state.openedStage){
                self.setState({openedStage: idStage});
            } else {
                self.setState({openedStage: ''});
            }
        }
    },
    render: function () {
        var list = this.props.stages.map((stage) => {

            var matchList = stage.matches.map((match) => {
                return <Link to={`/match/${match._id}`} className="collection-item">{match.name}</Link>
            });

            return (
                <li className="margin-enabled" onClick={this.triggerCollapsible(stage._id)}>
                    <div className="collapsible-header">
                        <i className={`
                            material-icons
                            icon-time-transition
                             ${this.state.openedStage == stage._id ? "turn-icon": ""}`}>
                            play_arrow
                        </i>
                        {stage.name}
                    </div>

                    <div className="collapsible-body">
                        <span>
                             {!matchList.length ? "В этапе ещё нет матчей" :
                                 <div className="collection">
                                     {matchList}
                                 </div>
                             }
                        </span>
                    </div>
                </li>
            )
        });

        return (
            <ul className="collapsible popout" data-collapsible="accordion">
                {list.length ? list : "Ни одного этапа ещё нет"}
            </ul>
        )
    }
});
