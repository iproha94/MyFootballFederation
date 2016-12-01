import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainActions from '../actions/main';

var Component = React.createClass({
    componentDidMount: function() {
        this.props.mainActions.getDatabase(this.props.currentUser._id);
    },
    render: function () {
        var federations = this.props.database.map(function(federation) {
            var tournaments = federation.tournaments.map(function(tournament) {
                var matches = tournament.matches.map(function(match){
                    return (
                        <Link to={`/match/${match._id}`}>
                            {match.name}&nbsp;&nbsp;&nbsp;&nbsp;   
                        </Link>
                    )
                });
                return (
                    <div>
                        <h5>{tournament.name}</h5>
                        <div className="interesting-matches_matches__padding">
                            {matches}
                        </div>
                    </div>
                );
            });

            return (
                <div className="card interesting-matches">
                    <h4>{federation.name}</h4>
                    <div className="interesting-matches_tournament__padding">   
                        {tournaments}               
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div className="card center">
                    Последнии игры в ваших федерациях
                </div>
                <div>
                    {federations}
                </div>
            </div>
        );
   } 
});


export default connect((state)=>{
    return {
        database: state.main,
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        mainActions: bindActionCreators(mainActions, dispatch)
    }
})(Component);