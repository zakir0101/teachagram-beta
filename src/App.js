import React from "react";
// import './App.css';
// import './Appbar.css'
// import './ClassWindow.css'
// import './CyclesWindow.css'
import './styles6.css'
import {fireChangeForInputTimeIfValid} from "@testing-library/user-event/dist/keyboard/shared";
import {Appbar} from "./Appbar";
import {ClassWindow} from "./ClassWindow";
import {CycleWindow} from "./CycleWindow";
import {LessonWindow} from "./LessonWindow";
import {themeBlueBurbel, themeBrauen, themeDarkBlue, themeLightBlue, themeStandard, themeWhiteBlue} from "./theme";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme:1,
            title: 0,
        }
        this.setTitle = this.setTitle.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.root = document.querySelector(':root');
        themeBlueBurbel(this.root)
        this.themes = ["Standard", "Braun", "Dark Blue",
            "Light Blue", "White Blue", "Blue Burbel"]
    }

    setTitle(newTitle) {
        this.setState(s => ({title: newTitle}))
    }

    setTheme(e, theme) {
        const index = this.themes.indexOf(theme)
        switch (index) {
            case 0:
                themeStandard(this.root)
                break;
            case 1:
                themeBrauen(this.root)
                break;
            case 2:
                themeDarkBlue(this.root)
                break;
            case 3:
                themeLightBlue(this.root)
                break;
            case 4:
                themeWhiteBlue(this.root)
                break
            case 5 :
                themeBlueBurbel(this.root)
                break

        }
        this.setState(s => ({theme:index}))
    }


    render() {
        let window;
        switch (this.state.title) {
            case 0:
                window = <ClassWindow setTitle={this.setTitle}></ClassWindow>;
                break;
            case 1:
                window = <CycleWindow setTitle={this.setTitle}></CycleWindow>;
                break;
            case 2:
                window = <LessonWindow setTitle={this.setTitle}></LessonWindow>;
                break;


        }
        return (
            <div className="container">
                <Appbar setTheme={this.setTheme} title={this.state.title}></Appbar>
                {window}
            </div>
        );
    }
}


export default App;

