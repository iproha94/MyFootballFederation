import React from 'react';

export default React.createClass({
    render: function () {
        var federations = this.props.teams.map(function (item) {
            return (
                <li className="collection-item">
                    <div>{item.name}
                        <a href={"/federation/"+item.name} className="secondary-content">
                            <i className="material-icons">send</i>
                        </a>
                    </div>
                </li>
            )
        });

        return (
            <ul className="collection with-header">
                <li className="collection-header center"><h5>Федерации</h5></li>

                {{#each federations}}
                <li className="collection-item"><div>{{name}}<a href="/federation/{{name}}" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                {{else}}
                {{#unless pageUser}}
                Вы не состоите в федерациях :(
                {{else}}
                Пользователь не состоит в федерациях
                {{/unless}}
                {{/each}}

                {{#unless pageUser}}
                <li className="collection-item right">
                    <a className="btn-floating btn-large waves-effect waves-light red" href="/federation/create"><i className="material-icons">add</i></a>
                </li>
                {{/unless}}
            </ul>
        );
    }
});
