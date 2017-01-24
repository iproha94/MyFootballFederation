import React from 'react';
import componentDidMountMixin from "./componentDidMountMixin";

export default React.createClass({
    mixins: [componentDidMountMixin],
    render: function () {
        return (
            <form className={`js-form-search federation-search right hide-on-med-and-down`} ref="form" >
                <div className="input-field">
                    <input id="search" placeholder={this.props.placeholder} type="search" className="autocomplete search" autocomplete="off" required/>
                    <label for="search"><i className="material-icons search_icon__margin">search</i></label>
                    <i className="material-icons search_icon__margin">close</i>
                </div>
            </form>
        );
    }
});

