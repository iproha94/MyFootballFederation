import React from 'react';

export default React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    idForm: "form-" + Math.random(),
    handleSubmit: function(event) {
        event.preventDefault();
        $.ajax({
            data: $(".js-modal-form").serialize(),
            url: this.props.urlSend,
            success: (data) => {
                console.log(data);
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
                this.props.onSuccess();
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    onClickStart: function () {
        $('select').material_select();
    },
    onChange: function () {
        $('select').material_select();
    },
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
                <a onClick={this.onClickStart} className="modal-trigger waves-effect waves-light btn"
                   href="#modal1">{this.props.buttonName}</a>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>{this.props.header}</h4>
                        
                        <div>
                            <form className="js-modal-form"
                                  id={this.idForm}
                                  onSubmit={this.handleSubmit}
                                  onChange={this.onChange}>
                                <input type="hidden" name={this.props.nameHiddenInput} value={this.props.valueHiddenInput}/>
                                <div className="input-field col s12">
                                    <select name="idSend">
                                        {options}
                                    </select>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                    

                    <div className="modal-footer">
                        <button form={this.idForm}
                                type="submit"
                                className="modal-action modal-close waves-effect waves-green btn-flat ">
                            Добавить
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

