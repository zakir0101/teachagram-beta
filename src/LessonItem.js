import React from "react";

class LessonItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lesson: this.props.lesson}

    }

    render() {

        const imageDelete = <span onClick={event => this.props.onDel(event, this.state.lesson)}
                                  className="material-symbols-outlined li-iconL">
                                        delete
                                        </span>;
        const imageEdit = <span onClick={event => this.props.onEdit(event, this.state.lesson)}
                                className="material-symbols-outlined li-iconL li-iconR">
                                        edit
                                        </span>;

        let lesson = this.state.lesson;


        return (
            <div>
                <div className="lesson-item" onClick={event => this.props.setTitle(0)}>
                    < div className="li-top">
                        {imageDelete}{imageEdit}
                        <p className="text-top">{lesson.hours} h</p>
                    </div>
                    <div className="li-bottom">{lesson.name}</div>
                </div>

            </div>
        );
    }


}


class AddLesson extends React.Component {

    constructor(props) {
        super(props);
        let lesson = this.props.lesson
        if (! lesson)
            this.state = {input: {name: ""}};
        else
            this.state={input: lesson}

        if (lesson) {
            this.oldInput = {
                name: lesson.name,
                date: lesson.date,
                hours: lesson.hours
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
            input: {name: e.target.value,}
        }))
    }


    render() {
        return (

            <div ref={this.myRef}  className="class-item input-container input-container-lesson">
                <span className="input-name">Name :</span>
                <input value={this.state.input.name} style={{backgroundColor: "white"}} onChange={this.onInput} type="text" className="input-text"/>
                <span className="input-name les-name"> Hours Number:</span>
                <input type="number" style={{backgroundColor: "white"}}className="input-text"/>

                <div className="button"  onClick={e => {
                    if (this.props.Edit)
                        this.props.onEditOk(e, this.oldInput, this.state.input);
                    else
                        this.props.onOk(e, this.state.input.name);
                }} > Add</div>
                <div className="button les-btn" onClick={this.props.onCancel}>Cancel</div>

                {/*<div ref={this.myRef} className="class-item input-container input-container-cycle">*/}
                {/*    <span className="input-name" style={{color: "white"}}>Name :</span>*/}
                {/*    <input value={this.state.input.name} onChange={this.onInput} type="text" className="input-text"/>*/}
                {/*    <div className="button in-btn1" onClick={e => {*/}
                {/*        if (this.props.Edit)*/}
                {/*            this.props.onEditOk(e, this.oldInput, this.state.input);*/}
                {/*        else*/}
                {/*            this.props.onOk(e, this.state.input.name);*/}
                {/*    }}> Add*/}
                {/*    </div>*/}
                {/*    <div className="button" onClick={this.props.onCancel}>Cancel</div>*/}

                {/*</div>*/}

            </div>


        );
    }

}


export {LessonItem, AddLesson}