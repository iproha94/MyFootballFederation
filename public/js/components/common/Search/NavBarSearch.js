import React from 'react';
import searchMixins from "./searchMixins";

export default React.createClass({
    mixins: [searchMixins],
    render: function () {
        return (
            <form className={`js-form-search federation-search right hide-on-med-and-down`} ref="form" >
                <div className="input-field">
                    <input id="search" placeholder={this.props.placeholder} type="search" className="autocomplete search" ref="input" autocomplete="off" required/>
                    <label for="search"><i className="material-icons search_icon__margin">search</i></label>
                    <i className="material-icons search_icon__margin" onClick={this.resetForm}>close</i>
                </div>
            </form>
        );
    }
});

