import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render: function () {
        let getScoreTeam = function (events, idTeam) {
            let score = 0;

            events.forEach(function (event) {
                if (idTeam == event.idTeam && event.idEvent == "GOAL") score++;
                if (idTeam != event.idTeam && event.idEvent == "OWN_GOAL") score++;
            });

            return score;
        };

        var matches = this.props.matches.map(function(match){
            return (
                <Link to={`/match/${match._id}`}
                      className="collection-item">
                    <span className={`${match.status == "RUNNING" ? "red"
                    : match.status == "FINISHED" ? "green" : "" } new badge`}
                          data-badge-caption="">
                        {match.status != "CREATED" ? getScoreTeam(match.events, match.team1) + ":" + getScoreTeam(match.events, match.team2) : "не начался"} &nbsp;
                        {match.status == "FINISHED" ? "окончен" : "" }
                        {match.status == "RUNNING" ? "идет!" : "" }
                    </span>
                    {match.name} &nbsp;
                </Link>
            )
        });

        return (
            <div className="content-flex">
                <div className="collection matchList_margin__disabled">
                    {matches.length ? matches : "Команда пока не участвовала не в одном матче"}
                </div>
            </div>
        )
    }
});
