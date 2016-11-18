var React = require('react');
var ReactDOM = require('react-dom');
var Sortable = require('sortablejs');

export  default React.createClass({
    createNewList: function(node) {//такая штука будет работать до того, пока списки матчей пусты
        var count = 0;
        var sortable = Sortable.create(node, {
            group:  {
                name: "group",
                pull: true,
                put: function () {
                    if(count > 1){
                        return false;
                    }
                    return true;
                }
            },
            chosenClass: "sortable-chosen",
            onAdd: function (/**Event*/evt) {
                count++;
            },
            onRemove: function (/**Event*/evt) {
                count--;
            }
        });
    },
    list: [{name: "1"},{name: "2"},{name: "3"},{name: "4"},{name: "5"}],
    componentDidMount: function () {
        var count = 10;
        this.createNewList(ReactDOM.findDOMNode(this.refs.left));
        for(var i=0; i<this.list.length/2; i++) {
            this.createNewList(ReactDOM.findDOMNode(this.refs["right" + i]));
        }
    },
    render: function () {
        var list = this.list;
        var teams = list.map((item, index) => {
            return <div className="collection-item" key={item.name}>
                {item.name}
            </div>;
        });

        var section = [];
        for(var i = 0; i<list.length/2; i++){
            section.push(
                <div className="collection match-teams-section" ref={"right" + i}></div>
            );
        }
        
        return(
            <div>
                <div className="row container">
                    <div className="col s5">
                        <div className="collection" ref="left">
                            {teams}
                        </div>
                    </div>
                    <div className="col s1"/>
                    <div className="col s5">
                        {section}
                    </div>
                </div>
            </div>
        );
    }
});