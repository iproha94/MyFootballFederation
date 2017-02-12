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
        var isAdmin = this.props.isAdmin;
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

                    <div className='collapsible-body white'>
                             {!stage.matches.length ?
                                 <div className={`empty-collapsible-body_padding
                                 ${!isAdmin? "empty-collapsible-body_padding-bottom" : ""}`}>
                                     В этапе ещё нет матчей
                                 </div>
                                 :
                                 <div className="enabled-border-bottom">
                                    <MatchList matches={stage.matches}/>
                                 </div>
                             }

                        {!isAdmin ? null :
                            <div className="match-create-button">
                                <a className="right modal-trigger btn-floating btn-large waves-effect waves-light red"
                                   href="#modal-stage">
                                    <i className="material-icons">add</i>
                                </a>
                            </div>
                        }
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
