import React from 'react';
import {Link} from 'react-router';
import MatchList from '../common/MatchList';

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
            if(self.state.openedStage != idStage){
                self.setState({openedStage: idStage});
            } else {
                self.setState({openedStage: ''});
            }
        }
    },
    render: function () {
        var list = this.props.stages.map((stage) => {
            return (
                <li className="margin-enabled" key={stage._id} onClick={this.triggerCollapsible(stage._id)}>
                    <div className="collapsible-header">
                        <i className={`
                            material-icons
                            icon-time-transition
                            ${this.state.openedStage == stage._id ? "turn-icon": ""}`}>
                            play_arrow
                        </i>
                        {stage.name}
                    </div>

                    <div className={`collapsible-body
                                    ${!stage.matches.length ? 'custom-collapsible-body' : ''}`}>
                        <span>
                             {!stage.matches.length ? "В этапе ещё нет матчей" :
                                 <div className="collection">
                                     <MatchList matches={stage.matches}/>
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
