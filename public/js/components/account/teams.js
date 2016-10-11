import React from 'react';

export default React.createClass({
    render: function () {
        var options = this.props.teams.map(function (item) {
            return (
                <li className="collection-item">
                    <div>
                        {item.name}
                        <a href={"/team/" + _id} className="secondary-content">
                            <i className="material-icons">send</i>
                        </a>
                    </div>
                </li>
            )
        });

        return (
            <ul className="collection with-header">
                <li className="collection-header center"><h5>Команды</h5></li>

                {{#each teams}}
                <li className="collection-item"><div>{{name}}<a href="/team/{{_id}}" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                {{else}}
                {{#unless pageUser}}
                Вы не состоите в командах :(
                {{else}}
                Пользователь не состоит в командах
                {{/unless}}
                {{/each}}

                <!--<div className="formContainer">-->
                <!--<form className="list-team" action="/account" method="POST" >-->
                <!--<input type="hidden" name="what" value="team">-->
                <!--<button className="waves-effect waves-light btn" type="submit" >показать</button>-->
                <!--</form>-->
                <!--</div>-->

                {{#unless pageUser}}
                <li className="collection-item right">
                    <a className="btn-floating btn-large waves-effect waves-light red" href="/team/create"><i className="material-icons">add</i></a>
                </li>
                {{/unless}}
            </ul>
        );
    }
});
