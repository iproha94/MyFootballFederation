import React from 'react';
import componentDidMountMixin from "./componentDidMountMixin";

export default React.createClass({
    mixins: [componentDidMountMixin],
    render: function () {
        return (
            <form className={`js-form-search card nav-side-search`} ref="form" >
                <div className="input-field">
                    <input id="search" placeholder={this.props.placeholder} type="search" className="autocomplete nav-side-search_input" autocomplete="off" required/>
                    <label for="search"><i className="material-icons nav-side-search_icons nav-side-search_icons__color">search</i></label>
                    <i className="material-icons nav-side-search_icons">close</i>
                </div>
            </form>
        );
    }
});
