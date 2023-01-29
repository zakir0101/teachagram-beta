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
                <div className="lesson-item">
                    < div className="li-top">
                        {imageDelete}{imageEdit}
                        <p className="text-top">{lesson.duration} h</p>
                    </div>
                    <div className="li-bottom">{lesson.date}</div>
                </div>

            </div>
        );
    }


}


class AddLesson extends React.Component {

    constructor(props) {
        super(props);
        let lesson = this.props.lesson
        if (!lesson)
            this.state = {
                input: {
                    date: new Date().toJSON().slice(0, 10),
                    duration: 0
                }
            };
        else
            this.state = {input: lesson}


        this.onInput = this.onInput.bind(this)
        this.myRef = React.createRef()

    }


    componentDidMount() {
        this.myRef.current.scrollIntoView()
    }

    onInput(e) {
        this.setState(s => {
            if (e.target.type === 'date')
                s.input.date = e.target.value
            else{
                if(e.target.value)
                    s.input.duration = e.target.value
                else
                    e.input.duration = 0
            }


        })
    }


    render() {
        return (

            <div ref={this.myRef} className="class-item input-container input-container-lesson">
                <span className="input-name">Date :</span>
                <input value={this.state.input.date} style={{backgroundColor: "white"}} onChange={this.onInput}
                       type="date" className="input-text"/>
                <span className="input-name les-name"> Hours Number:</span>
                <input type="number" style={{backgroundColor: "white"}}
                       onChange={this.onInput}  className="input-text"/>

                <div className="button" onClick={e => {
                    if (this.props.Edit)
                        this.props.onEditOk(e, this.state.input);
                    else
                        this.props.onOk(e, this.state.input);
                }}> Add
                </div>
                <div className="button les-btn" onClick={this.props.onCancel}>Cancel</div>


            </div>


        );
    }

}


export {LessonItem, AddLesson}