import React from 'react';

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
        return !this.props.currentUser._id ? null: (
                    this.props.federation.members.includes(this.props.currentUser._id) ?
                        <a className="waves-effect waves-light btn right" onClick={this.unsubscribeFederation}>Отписаться</a>:
                        <a className="waves-effect waves-light btn right" onClick={this.subscribeFederation}>Подписаться</a>
                );
    }
});
