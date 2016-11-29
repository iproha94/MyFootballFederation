import React from 'react';
import List from '../../components/common/List';

export default React.createClass({
    render: function () {
        var federation = this.props.federation;
        return (
            <div className="container content-flex">
                {!this.props.currentUser._id ? null: (
                    this.props.federation.members.includes(this.props.currentUser._id) ?
                        <a className="waves-effect waves-light btn" onClick={this.unsubscribeFederation}>Отписаться от федерации</a>:
                        <a className="waves-effect waves-light btn" onClick={this.subscribeFederation}>Подписаться на федерацию</a>
                )
                }

                <List header="Подписчики"
                      url="/account/"
                      defaultMessage="На эту федерацию ни кто не подписан"
                      list={this.props.federation.membersWithName}/>


                <List header="Идущие сейчас матчи:"
                      url="/match/"
                      defaultMessage="Нет идущих матчей"
                      list={this.props.federation.runningMatches}/>
            </div>
        );
    }
});
