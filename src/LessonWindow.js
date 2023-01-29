import React from "react";
import ReactDom from "react-dom";
import {AddLesson, LessonItem} from "./LessonItem";
import {AddButton} from "./ClassItem";
import {address} from "./mode";

class LessonWindow extends React.Component {
    constructor(props) {
        super(props);
        let lessons = []
        let lastMonth = new Date().getDate() - 60;
        for (let i = 0; i < 7; i++) {
            let h = Math.floor(Math.random() * 4) + 1
            lessons.push({
                name: "Lesson "+i,
                hours: h.toString(),
                date: lastMonth + (7 * i)
            })
        }
        this.state = {
            onAdd: false,
            onEdit: false,
            Edit: null,
            lessonList:[],
            //lessons: lessons
        }

        this.onAdd = this.onAdd.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onEditOk = this.onEditOk.bind(this)

    }



    componentDidMount() {
        this.getLessonList()
    }
    getLessonList(){
        let msg = { type : 'lesson' ,command: 'get' , user_id : this.props.user.id ,
            cycle_id : this.props.activeCycle.id}

        let params = {
            "method": "POST",
            "mode" : "cors",
            "headers": {
                "Content-type" : "text/plain"
                // "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(msg)
        }

        fetch(address, params ).then
        ((response) => {
            return  response.json()}).then
        ((json) => {
            this.setState(state =>state.lessonList = json.data)
        });

    }




    onAdd(e) {

        this.setState((state) => ({
            onAdd: true,
        }))

    }

    onOk(e, lesson) {
        let date = lesson.date;
        let hours = lesson.duration
        ReactDom.findDOMNode(this).scrollIntoView();


        let msg = { type : 'lesson' ,command: 'add' ,date : date ,
           duration : hours , user_id : this.props.user.id ,
            class_id : this.props.activeClass.id,
            cycle_id : this.props.activeCycle.id}

        let params = {
            "method": "POST",
            "mode" : "cors",
            "headers": {
                "Content-type" : "text/plain"
                // "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(msg)
        }

        fetch(address, params ).then
        ((response) => {
            return  response.json()}).then
        ((json) => {

            this.setState(state =>( {lessonList : json.data , onAdd : false }))

        });




    }

    onCancel(e) {
        ReactDom.findDOMNode(this).scrollIntoView();
        this.setState((state) => ({onAdd: false, onEdit: false}))
    }

    update() {
        this.setState((state) => {
            return state
        })
    }

    onDelete(e, lesson) {
        if (e)
            e.stopPropagation()
        console.log("user_id  :"+this.props.user.id)
        console.log("cycle_id  :"+this.props.activeCycle.id)
        let msg = { type : 'lesson' ,command: 'del' ,
             lesson_id : lesson.id , cycle_id:this.props.activeCycle.id
            , user_id : this.props.user.id}

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
            this.setState(state => ({lessonList : json.data }))

        });
    }

    onEdit(e, lesson) {
        e.stopPropagation()
        if (this.state.onAdd === true)
            return;
        this.setState((state) => ({
            onAdd: true,
            onEdit: true,
            Edit: lesson
        }))
    }

    onEditOk(e,  newLesson) {
        ReactDom.findDOMNode(this).scrollIntoView();

        let msg = { type : 'lesson' ,command: 'edit' ,
            lesson_id :this.state.Edit.id,
            cycle_id:this.props.activeCycle.id ,
            date : newLesson.date ,duration : newLesson.duration,
            user_id : this.props.user.id}

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

            this.setState(state => {
                state.onEdit=false; state.Edit={} ; state.onAdd = false ;
                state.lessonList = json.data ; this.forceUpdate()})
        });

    }



    render() {

        console.log("Rendering lesson widow")
        return <div className="container-Class container-cycles container-lessons ">
            <div className="container-left">
                <div className="lesson-container">
                    {this.state.lessonList.map((l) =>
                        <LessonItem lesson={l} key={l.id}
                                    setTitle={this.props.setTitle} onDel={this.onDelete}
                                    onEdit={this.onEdit}
                        ></LessonItem>)}
                </div>
            </div>
            <div className=" container-right ">
                {
                    this.state.onAdd ?
                        <AddLesson lesson={this.state.Edit}
                                  onOk={this.onOk} Edit={this.state.onEdit}
                                  onEditOk={this.onEditOk}
                                  onCancel={this.onCancel}></AddLesson> :
                        <AddButton callback={this.onAdd}> </AddButton>}
            </div>
        </div>

    }
}

export {LessonWindow}