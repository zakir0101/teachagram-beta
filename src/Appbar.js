import React from "react";


const MODE = ["Classes" , "Cycles" ,"Lessons"]

class   Appbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = { popShow : false}
        this.onMore=this.onMore.bind(this)
        this.themes = ["Standard" ,"Braun","Dark Blue",
            "Light Blue" , "White Blue" , "Blue Burbel"]
        this.themes = ["White Blue" , "Blue Burbel" ,"logout"]

    }

    onMore(e){
        this.setState(s => ({popShow:!s.popShow}))
    }

    render(){
        let user_title = "" ;
        if(this.props.user.username) {
            user_title = this.props.user.username;
            user_title = user_title.charAt(0).toUpperCase() + user_title.slice(1);
        }


        this.image = <span className="material-symbols-outlined title-icon">
                    menu_book
                    </span>;
        this. image2 =   <span  className="material-symbols-outlined title-icon" onClick={this.onMore}>
                    more_vert
                    </span>
        this. appName = <span onClick={event => this.props.setTitle(0,"home")}  className="title-text">
                    {user_title }
                </span>
        this. title = <span className="title-text title-text2">
                    {this.props.title.text}
                </span>
        let appbar;
        if (this.state.popShow)
            appbar = <div className="popup">
                {this.themes.map(th =>  <a onClick={event =>{ this.onMore(event)
                    this.props.setTheme(event,th);}} key={th} className="link">{th}</a>) }
                     </div>
        else
            appbar = <div></div>

        return (
            <div className="container-top">
                <div className="ct-left">{this.image}{this.appName}</div>
                <div className="ct-middle">{this.title}</div>
                <div className="ct-right">{this.image2}</div>
                {appbar}

            </div>
        )
    }

}


export {Appbar};