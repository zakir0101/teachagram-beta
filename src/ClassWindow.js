import {AddButton, AddItem, ClassItem} from "./ClassItem";
import React from "react";
import {address} from "./mode";
import {post_message, post_message_action} from "./teachgram_api";


class ClassWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            onAdd : false,
            onEdit: false,
            Edit:{},
            classList : []
        }

        this.onAdd = this.onAdd.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onAddOk = this.onAddOk.bind(this)
        this.onDelete= this.onDelete.bind(this)
        this.onEdit= this.onEdit.bind(this)
        this.onEditOk= this.onEditOk.bind(this)
    }

    componentDidMount() {
        this.getClassList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user){
            if (this.props.user.id !== undefined) {
                this.getClassList()
            }
        }
    }


    onAdd(e){

        this.setState((state) =>( {
            onAdd : true ,
        }))

    }
    onDelete(e , clas){
        if(e)
            e.stopPropagation()
        let msg = { type : 'class' ,command: 'del' ,class_id : clas.id , user_id : this.props.user.id}

        post_message_action(msg,()=>{} ,
            ( json )=>   this.setState(state =>state.classList = json.data),

            ()=>{} )

    }
    onEdit(e ,clas){
        e.stopPropagation()
        if(this.state.onAdd === true)
            return;

        this.setState((state) =>( {
            onAdd : true ,
            onEdit:true,
            Edit:clas
        }))
    }



    onCancel(e){
        this.setState((state) =>( {onAdd : false , onEdit:false ,Edit :{}}))
    }


    getClassList(){
        let msg = { type : 'class' ,command: 'get' , user_id : this.props.user.id}

        post_message_action(msg,()=>{} ,
            ( json )=>   this.setState(state =>state.classList = json.data),
            ()=>{} )

    }

    onAddOk(e, name){
        let msg = { type : 'class' ,command: 'add' ,name : name , user_id : this.props.user.id}
        let handelSuccess= (json) =>
        {this.setState(state =>( {classList : json.data , onAdd : false }))};
        post_message_action(msg,()=>{} , handelSuccess, ()=>{} )

    }
    onEditOk(e, name){
        let msg = { type : 'class' ,command: 'edit' ,class_id :this.state.Edit.id , name : name, user_id : this.props.user.id}
        let handelSuccess= (json) => {
            this.setState(state => { state.classList = [] ;
                state.onEdit=false; state.Edit={} ; state.onAdd = false ;
                state.classList = json.data ; this.forceUpdate()})}
        post_message_action(msg,()=>{} , handelSuccess, ()=>{} )

    }

    render() {
        return (
            <div  className="container-Class">
                {this.state.classList.map(clas => <ClassItem setTitle={this.props.setTitle} onDel={this.onDelete}
                                                         onEdit={this.onEdit} class={clas}
                                                             setActiveClass={this.props.setActiveClass}
                                                         key={clas.name} name={clas.name}></ClassItem> )}
                {
                    this.state.onAdd?
                    <AddItem class={this.state.Edit}
                             onOk={this.onAddOk} Edit={this.state.onEdit}
                             onEditOk={this.onEditOk}
                             onCancel={this.onCancel}></AddItem> :
                    <AddButton callback={this.onAdd}> </AddButton> }
            </div>
        )
    }


}


export {ClassWindow}