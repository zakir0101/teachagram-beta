import {AddButton, AddItem, ClassItem} from "./ClassItem";
import React from "react";


class ClassWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            onAdd : false,
            onEdit: false,
            Edit:"",
            names : ["Omer","Abderehman", "Ali","Hassan"]
        }

        this.onAdd = this.onAdd.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onDelete= this.onDelete.bind(this)
        this.onEdit= this.onEdit.bind(this)
        this.onEditOk= this.onEditOk.bind(this)
    }
    onAdd(e){

        this.setState((state) =>( {
            onAdd : true ,
        }))
        console.log("rerendering")
    }
    onOk(e,name){
        this.state.names.push(name)
        this.setState((state) =>( {onAdd : false}))
    }
    onCancel(e){
        this.setState((state) =>( {onAdd : false , onEdit:false}))
    }

    update(){
        this.setState((state) => {return  state})
    }
    onDelete(e , name){
        if(e)
          e.stopPropagation()
        const index = this.state.names.indexOf(name);
        if (index > -1) { // only splice array when item is found
            this.state.names.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.update()
    }
    onEdit(e ,name){
        e.stopPropagation()
        if(this.state.onAdd === true)
            return;
        this.setState((state) =>( {
            onAdd : true ,
            onEdit:true,
            Edit:name
        }))
    }
    onEditOk(e,oldName , name){
        const names = this.state.names
        const index = names.indexOf(oldName);
        if (index > -1) { // only splice array when item is found
            names.splice(index, 1,name); // 2nd parameter means remove one item only
        }
        this.setState((state) =>( {
            onAdd : false ,
            onEdit:false,
            Edit:""
        }))

    }
    render() {
        return (
            <div className="container-Class">
                {this.state.names.map(name => <ClassItem setTitle={this.props.setTitle} onDel={this.onDelete}
                                                         onEdit={this.onEdit}
                                                         key={name} name={name}></ClassItem> )}
                {
                    this.state.onAdd?
                    <AddItem  name={this.state.Edit}
                              onOk={this.onOk} Edit={this.state.onEdit}
                              onEditOk={this.onEditOk}
                              onCancel={this.onCancel}></AddItem> :
                    <AddButton callback={this.onAdd}> </AddButton> }
            </div>
        )
    }


}


export {ClassWindow}