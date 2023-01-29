import React, {useEffect} from "react";
import {AddCycle, CycleItem} from "./CycleItem";
import {AddButton, AddItem} from "./ClassItem";
import ReactDom from "react-dom";
import {address} from "./mode";

class CycleWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onAdd: false,
            onEdit: false,
            Edit: null,
            cycleList:[]
            // cycles: [
            //     {
            //         name: "Cycle1",
            //         date: "25.03.2022",
            //         lessons: 4,
            //         hours: 11
            //     },
            //     {
            //         name: "Cycle2",
            //         date: "25.03.2022",
            //         lessons: 5,
            //         hours: 22
            //     },
            //     {
            //         name: "Cycle3",
            //         date: "25.03.2022",
            //         lessons: 8,
            //         hours: 33
            //     },
            //     {
            //         name: "Cycle4",
            //         date: "25.03.2022",
            //         lessons: 2,
            //         hours: 5
            //     }]
        }

        this.onAdd = this.onAdd.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onEditOk = this.onEditOk.bind(this)
        this.myRef1 = React.createRef()

    }

    componentDidMount() {
        this.getCycleList()
    }
    getCycleList(){
        let msg = { type : 'cycle' ,command: 'get' , user_id : this.props.user.id ,
                    class_id : this.props.activeClass.id}

        let params = {
            "method": "POST",
            "mode" : "cors",
            "headers": {
                "Content-type" : "text/plain"
                // "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(msg)
        }

        fetch(address, params ).
        then((response) => {
            return  response.json()}).then
        ((json) => {

            this.setState(state =>state.cycleList = json.data)
        });

    }



    onAdd(e) {

        this.setState((state) => ({
            onAdd: true,
        }))

    }

    onOk(e, date) {
        ReactDom.findDOMNode(this).scrollIntoView();
        let msg = { type : 'cycle' ,command: 'add' ,date : date ,
            user_id : this.props.user.id , class_id : this.props.activeClass.id}

        let params = {
            "method": "POST",
            "mode" : "cors",
            "headers": {
                "Content-type" : "text/plain"
                // "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(msg)
        }

        fetch(address, params ).
        then((response) => {
            return  response.json()}).then
        ((json) => {

            this.setState(state =>( {cycleList : json.data , onAdd : false }))

        });

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

        let msg = { type : 'cycle' ,command: 'del' , cycle_id:cycle.id ,
            class_id : this.props.activeClass.id , user_id : this.props.user.id}

        let params = {
            "method": "POST",
            "mode" : "cors",

            "headers": {
                "Content-type" : "text/plain"
                // "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(msg)
        }

        fetch(address, params ).
        then((response) => {
            return  response.json()}).then
        ((json) => {
            this.setState(state =>( {cycleList : json.data }))
        });


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

    onEditOk(e, new_date) {
        ReactDom.findDOMNode(this).scrollIntoView();
        let msg = { type : 'cycle' ,command: 'edit' ,cycle_id :this.state.Edit.id,
            class_id:this.props.activeClass.id ,
            date : new_date, user_id : this.props.user.id}

        let params = {
            "method": "POST",
            "mode" : "cors",
            "headers": {
                // "Content-Type": "application/json; charset=utf-8"
                "Content-type" : "text/plain"

            },
            "body": JSON.stringify(msg)
        }

        fetch(address, params ).
        then((response) => {
            return  response.json()}).then
        ((json) => {

            this.setState(state => {
                state.onEdit=false; state.Edit={} ; state.onAdd = false ;
                state.cycleList = json.data ; this.forceUpdate()})
        });



    }

    render() {


        return (
            <div className="container-Class container-cycles">
                <div id="myId" className="cy-left">
                    {this.state.cycleList.map((c) =>
                        <CycleItem cycle={c} key={c.date}
                                   setTitle={this.props.setTitle}
                                   setActiveCycle={this.props.setActiveCycle}
                                   onDel={this.onDelete}
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