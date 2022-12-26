import React, {useEffect} from "react";
import {AddCycle, CycleItem} from "./CycleItem";
import {AddButton, AddItem} from "./ClassItem";
import ReactDom from "react-dom";

class CycleWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onAdd: false,
            onEdit: false,
            Edit: null,

            cycles: [
                {
                    name: "Cycle1",
                    date: "25.03.2022",
                    lessons: 4,
                    hours: 11
                },
                {
                    name: "Cycle2",
                    date: "25.03.2022",
                    lessons: 5,
                    hours: 22
                },
                {
                    name: "Cycle3",
                    date: "25.03.2022",
                    lessons: 8,
                    hours: 33
                },
                {
                    name: "Cycle4",
                    date: "25.03.2022",
                    lessons: 2,
                    hours: 5
                }]
        }

        this.onAdd = this.onAdd.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onEditOk = this.onEditOk.bind(this)
        this.myRef1 = React.createRef()

    }


    onAdd(e) {

        this.setState((state) => ({
            onAdd: true,
        }))

    }

    onOk(e, name) {
        ReactDom.findDOMNode(this).scrollIntoView();

        let c = {
            name: name,
            date: new Date().toLocaleDateString(),
            lessons: 4,
            hours: 12
        }
        this.state.cycles.push(c)
        this.setState((state) => ({onAdd: false}))
    }

    onCancel(e) {
        ReactDom.findDOMNode(this).scrollIntoView();
        window.scrollTo(0,document.querySelector("#myId"    ).offsetTop)
        this.setState((state) => ({onAdd: false, onEdit: false}))
    }

    update() {
        this.setState((state) => {
            return state
        })
    }

    onDelete(e, cycle) {
        if (e)
            e.stopPropagation()
        const index = this.state.cycles.findIndex(c => {
            return c.name === cycle.name
        });
        if (index > -1) { // only splice array when item is found
            this.state.cycles.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.update()
    }

    onEdit(e, cycle) {
        e.stopPropagation()
        if (this.state.onAdd === true)
            return;
        this.setState((state) => ({
            onAdd: true,
            onEdit: true,
            Edit: cycle
        }))
    }

    onEditOk(e, oldCycle, newCycle) {
        ReactDom.findDOMNode(this).scrollIntoView();

        console.log(oldCycle)
        console.log(newCycle)
        newCycle.date= oldCycle.date;
        newCycle.hours= oldCycle.hours;
        newCycle.lessons= oldCycle.lessons;
        const cycles = this.state.cycles
        const index = cycles.findIndex(c => {
            return c.name === oldCycle.name
        });
        if (index > -1) { // only splice array when item is found
            this.state.cycles.splice(index, 1, newCycle); // 2nd parameter means remove one item only
        }
        this.setState((state) => ({
            onAdd: false,
            onEdit: false,
            Edit: null
        }))

    }

    render() {


        return (
            <div className="container-Class container-cycles">
                <div id="myId" className="cy-left">
                    {this.state.cycles.map((c) =>
                        <CycleItem cycle={c} key={c.name}
                                   setTitle={this.props.setTitle} onDel={this.onDelete}
                                   onEdit={this.onEdit}
                        ></CycleItem>)}
                </div>
                <div className="cy-right">
                    {
                        this.state.onAdd ?
                            <AddCycle cycle={this.state.Edit}
                                      onOk={this.onOk} Edit={this.state.onEdit}
                                      onEditOk={this.onEditOk}
                                      onCancel={this.onCancel}></AddCycle> :
                            <AddButton callback={this.onAdd}> </AddButton>}
                </div>

            </div>)
    }
}

export {CycleWindow}