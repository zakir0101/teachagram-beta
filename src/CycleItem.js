import React, {useEffect} from "react";

class CycleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cycle: this.props.cycle}

    }


    render() {


        const imageDelete = <span onClick={event => this.props.onDel(event, this.state.cycle)}
                                  className="material-symbols-outlined cim-icon2">
                    delete
                    </span>;
        const imageEdit = <span onClick={event => this.props.onEdit(event, this.state.cycle)}
                                className="material-symbols-outlined cim-icon2">
                    edit
                    </span>;

        let cycle = this.state.cycle;
        return (
            <div  className="cycle-item" onClick={event => this.props.setTitle(2)}>
                <div className="cy-it-left">{imageDelete}{imageEdit} </div>
                <div className="cy-it-right">
                    <p className="big-text">{cycle.name} on {cycle.date}</p>
                    <div className="small-container">
                        <p className="small-text">{cycle.lessons} lesson added</p>
                        <p className="small-text">total of {cycle.hours} hours </p>
                    </div>
                </div>

            </div>
        );
    }
}


class AddCycle extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.cycle)
            this.state = {input: {name: ""}};
        else
            this.state={input: this.props.cycle}

        if (this.props.cycle) {
            this.oldInput = {
                name: this.state.input.name,
                date: this.state.input.date,
                lessons: this.state.input.lessons,
                hours: this.state.input.hours
            }
        }

        this.onInput = this.onInput.bind(this)
        this.myRef = React.createRef()


    }

    componentDidMount() {
        this.myRef.current.scrollIntoView()
    }

    onInput(e) {

        this.setState(s => ({
            input: {
                name: e.target.value,

            }
        }))
    }

    render() {

        return (
            <div ref={this.myRef} className="class-item input-container input-container-cycle">
                <span className="input-name" style={{color: "white"}}>Name :</span>
                <input value={this.state.input.name} onChange={this.onInput} type="text" className="input-text"/>
                <div className="button in-btn1" onClick={e => {
                    if (this.props.Edit)
                        this.props.onEditOk(e, this.oldInput, this.state.input);
                    else
                        this.props.onOk(e, this.state.input.name);
                }}> Add
                </div>
                <div className="button" onClick={this.props.onCancel}>Cancel</div>

            </div>

        )
    }
}


export {CycleItem, AddCycle}