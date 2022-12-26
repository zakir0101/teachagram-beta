import React from "react";
import ReactDom from "react-dom";
import {AddCycle, CycleItem} from "./CycleItem";
import {AddLesson, LessonItem} from "./LessonItem";
import {AddButton} from "./ClassItem";

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

            lessons: lessons
        }

        this.onAdd = this.onAdd.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onEditOk = this.onEditOk.bind(this)

    }


    onAdd(e) {

        this.setState((state) => ({
            onAdd: true,
        }))

    }

    onOk(e, name, hours) {
        ReactDom.findDOMNode(this).scrollIntoView();

        let l = {
            name: name,
            date: new Date().toLocaleDateString(),
            hours: 4
        }
        this.state.lessons.push(l)
        this.setState((state) => ({onAdd: false}))
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
        const index = this.state.lessons.findIndex(l => {
            return l.name === lesson.name
        });
        if (index > -1) { // only splice array when item is found
            this.state.lessons.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.update()
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

    onEditOk(e, oldLesson, newLesson) {
        ReactDom.findDOMNode(this).scrollIntoView();

        newLesson.date = oldLesson.date;
        newLesson.hours = oldLesson.hours;
        const lessons = this.state.lessons
        const index = lessons.findIndex(l => {
            return l.name === oldLesson.name
        });
        if (index > -1) { // only splice array when item is found
            lessons.splice(index, 1, newLesson); // 2nd parameter means remove one item only
        }
        this.setState((state) => ({
            onAdd: false,
            onEdit: false,
            Edit: null
        }))

    }

    render() {

        console.log("Rendering lesson widow")
        return <div className="container-Class container-cycles container-lessons ">
            <div className="container-left">
                <div className="lesson-container">
                    {this.state.lessons.map((l) =>
                        <LessonItem lesson={l} key={l.name}
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