import React from 'react';
import searchMixins from "./searchMixins";

export default React.createClass({
    mixins: [searchMixins],
    render: function () {
        return (
             <form className={`js-form-search card nav-side-search`} ref="form" >
                <div className="input-field">
                    <input id="search"
                           placeholder={this.props.placeholder}
                           type="search" ref="input"
                           className="autocomplete nav-side-search_input truncate"
                           autocomplete="off"
                           required/>
                    <label for="search"><i className="material-icons nav-side-search_icons nav-side-search_icons__color">search</i></label>
                    <i className="material-icons nav-side-search_icons" onClick={this.resetForm}>close</i>
                </div>
            </form>
        );
    }
});
