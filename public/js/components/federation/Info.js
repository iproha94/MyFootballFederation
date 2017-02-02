import React from 'react';
import List from '../../components/common/List';

export default React.createClass({
    subscribeFederation: function () {
        $.ajax({
            url: "/api/federation/subscribe/" + this.props.federation.name,
            success: (data) => {
                Materialize.toast("Вы успешно подписались на федерацию", 2000);
                this.props.addCurrentUserFederation(this.props.federation);
                this.props.getFederationInfo(this.props.federation.name);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    unsubscribeFederation: function () {
        $.ajax({
            url: "/api/federation/unsubscribe/" + this.props.federation.name,
            success: (data) => {
                Materialize.toast("Вы успешно отписались от федерации", 2000);
                this.props.removeCurrentUserFederation(this.props.federation.name);
                this.props.getFederationInfo(this.props.federation.name);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        var federation = this.props.federation;
        return (
            <div className="container content-flex">
                <List header="Подписчики"
                      url="/account/"
                      defaultMessage="На эту федерацию ни кто не подписан"
                      list={this.props.federation.membersWithName}/>

                <div className="center">
                    {!this.props.currentUser._id ? null: (
                        this.props.federation.members.includes(this.props.currentUser._id) ?
                            <a className="waves-effect waves-light btn" onClick={this.unsubscribeFederation}>Отписаться от федерации</a>:
                            <a className="waves-effect waves-light btn" onClick={this.subscribeFederation}>Подписаться на федерацию</a>
                    )}
                </div>

                <List header="Идущие сейчас матчи:"
                      url="/match/"
                      defaultMessage="Нет идущих матчей"
                      list={this.props.federation.runningMatches}/>
            </div>
        );
    }
});
