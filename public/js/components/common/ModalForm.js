import React from 'react';

export default React.createClass({
    render: function () {
        var options = this.props.valueArray.map(function (item) {
            return (
                <option key={item._id} value={item._id}>
                    {item.name}
                </option>
            )
        });
        
        return (
            <div>
                <form className="js-modal-form">
                    <input type="hidden" name={this.props.nameHiddenInput} value={this.props.valueHiddenInput}/>
                    <div className="input-field col s12">
                        <select name="idSend">
                            {options}
                        </select>
                    </div>
                </form>
            </div>
        );
    }
});
