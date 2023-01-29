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
            <div className="cycle-item" onClick={event => {
                this.props.setActiveCycle(this.props.cycle);
                this.props.setTitle(2,"Cycle "+this.props.cycle.date);
            }}>
                <div className="cy-it-left">{imageDelete}{imageEdit} </div>
                <div className="cy-it-right">
                    <p className="big-text">Cycle on {cycle.date}</p>
                    <div className="small-container">
                        <p className="small-text">{cycle.count} lesson added</p>
                        <p className="small-text">total of {cycle.duration} hours </p>
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
            this.state = {input: {date: new Date().toJSON().slice(0, 10)}};
        else
            this.state = {input: this.props.cycle}
        this.onInput = this.onInput.bind(this)
        this.myRef = React.createRef()


    }

    componentDidMount() {
        this.myRef.current.scrollIntoView()
    }

    onInput(e) {

        this.setState(s => ({
            input: {
                date: e.target.value,
            }
        }))
    }

    render() {

        return (
            <div ref={this.myRef} className="class-item input-container input-container-cycle">
                <span className="input-name">Date :</span>
                <input style={{backgroundColor: "white"}} value={this.state.input.date} onChange={this.onInput}
                       type="date" className="input-text"/>
                <div className="button in-btn1" onClick={e => {
                    if (this.props.Edit)
                        this.props.onEditOk(e, this.state.input.date);
                    else
                        this.props.onOk(e, this.state.input.date);
                }}> Add
                </div>
                <div className="button" onClick={this.props.onCancel}>Cancel</div>

            </div>

        )
    }
}


export {CycleItem, AddCycle}