import React from "react";


class ClassItem extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.image = <span onClick={event => props.onDel(event,this.name)} className="material-symbols-outlined title-icon cim-icon2">
                    delete
                    </span>;
        this.image2 = <span onClick={event => props.onEdit(event,this.name)} className="material-symbols-outlined cim-icon2">
                        edit
                        </span>;
    }

    render() {
        return (
            <div className="class-item" onClick={event =>  this.props.setTitle(1)}>
                <div className="cim-top-top">{this.image} {this.image2}</div>
                <div className="cim-top">{this.name.charAt(0).toUpperCase()}</div>
                <div className="cim-bottom">{this.name}</div>
            </div>
        );
    }


}

class AddButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="class-item add">
                <div className="add-button" onClick={this.props.callback}>
                    <span className="material-symbols-outlined add-icon">
                       add
                    </span>
                </div>
            </div>
        )
    }


}

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state ={ input: this.props.name}
        this.onInput = this.onInput.bind(this)
        this.oldName = this.props.name

        this.myRef = React.createRef()


    }

    componentDidMount() {
        this.myRef.current.scrollIntoView()
    }

    onInput(e) {
        this.setState(s =>({input:e.target.value}) )
    }

    render() {

        return (
            <div ref={this.myRef} className="class-item input-container">
                <span className="input-name" style={{color: "white"}}>Name :</span>
                <input value={this.state.input} onChange={this.onInput} type="text" className="input-text"/>
                <div className="button" onClick={e => {
                    if (this.props.Edit)
                        this.props.onEditOk(e, this.oldName, this.state.input);
                    else
                        this.props.onOk(e, this.state.input);}}  > Add
                </div>
                <div className="button" onClick={this.props.onCancel}>Cancel</div>

            </div>

        )
    }
}


export {AddItem, ClassItem, AddButton};