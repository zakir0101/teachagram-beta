import React, {useState} from "react";
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
import {address} from "./mode";
import {post_message, user_get, user_set} from "./teachgram_api";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 1,
            title: {index: 0, text: "Home"},
            Title: '',
            activeUser: {},
            activeClass: {},
            activeCycle: {},
            login: false,
            error: ""
        }

        this.logout = this.logout.bind(this);
        this.getUser = this.getUser.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.setActiveClass = this.setActiveClass.bind(this);
        this.setActiveCycle = this.setActiveCycle.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.root = document.querySelector(':root');
        themeWhiteBlue(this.root)
        this.themes = ["Standard", "Braun", "Dark Blue",
            "Light Blue", "White Blue", "Blue Burbel"]
        this.themes = ["White Blue", "Blue Burbel", "logout"]

    }

    setLogin(login) {
        this.setState(state => ({login: login}))
    }

    componentDidMount() {
        this.getUserCookies()
    }

    logout() {
        this.setTitle(0, 'home')
        this.setState(state => ({
            theme: 1,
            title: {index: 0, text: "Home"},
            Title: '',
            activeUser: {},
            activeClass: {},
            activeCycle: {},
            login: false,
            error: "",
            ERROR: ""
        }))
        this.deleteUserCookies()

    }

    setActiveUser(user) {
        this.setState(state => ({activeUser: user}));
    }

    deleteUserCookies() {
        this.setCookie('username', "", 1)
        this.setCookie('password', "", 1)
    }

    saveUserCookies(user) {
        this.setCookie('username', user.username, 7)
        this.setCookie('password', user.password, 7)
    }

    getUserCookies() {
        let username = this.getCookie('username');
        let password = this.getCookie('password');
        if (username && password)
            this.getUser(username, password)
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


    setActiveClass(clas) {
        this.setState(state => {
            state.activeClass = clas;
        });

    }

    setActiveCycle(cycle) {
        this.setState(state => state.activeCycle = cycle);
        console.log("setting active cycle")

        console.log(cycle)
    }


    getUser(username, password) {
        let msg = {type: 'user', command: 'get', username: username, password: password}
        post_message(msg).then((data) => {
            switch (data.type) {
                case "ERROR":
                    this.setState(state => ({
                        error: data.msg
                    }))

                    break;
                case "error" :
                    this.setState(state => ({ERROR: data.msg}))
                    break
                case "SUCCESS" :
                    this.setState(state => ({activeUser: data, login: true}))
                    this.saveUserCookies(data)
                    break

            }
        })

    }


    setUser(username, password) {
        let msg = {type: 'user', command: 'set', username: username, password: password}
        post_message(msg).then((data) => {
            if (data.type) {
                if (data.type === "ERROR") {
                    this.setState(state => ({error: data.msg}))
                } else if (data.type === "error") {
                    this.setState(state => ({ERROR: data.msg}))
                }
            } else {
                console.log("indide ok")
                this.setState(state => ({activeUser: data, login: true}))
                this.saveUserCookies(data)
            }
        })
    }


    setTitle(index, text) {


        text = text.charAt(0).toUpperCase() + text.slice(1);


        this.setState(s => ({title: {index: index, text: text}}))
        if (index === 0)
            ;
    }

    setTheme(e, theme) {
        const index = this.themes.indexOf(theme)
        switch (index) {
            // case 0:
            //     themeStandard(this.root)
            //     break;
            // case 1:
            //     themeBrauen(this.root)
            //     break;
            // case 2:
            //     themeDarkBlue(this.root)
            //     break;
            // case 3:
            //     themeLightBlue(this.root)
            //     break;
            case 0:
                themeWhiteBlue(this.root)
                break
            case 1 :
                themeBlueBurbel(this.root)
                break
            case 2 :
                this.logout()
                break


        }
        this.setState(s => ({theme: index}))
    }


    render() {
        let window;
        let error = this.state.ERROR
        if (error) {
            window = <div dangerouslySetInnerHTML={{__html: error}}></div>;
        } else if (this.state.login) {


            switch (this.state.title.index) {

                case 0:
                    window = <ClassWindow user={this.state.activeUser}
                                          setActiveClass={this.setActiveClass}
                                          setTitle={this.setTitle}></ClassWindow>;
                    break;
                case 1:
                    window = <CycleWindow user={this.state.activeUser}
                                          activeClass={this.state.activeClass}
                                          setActiveCycle={this.setActiveCycle}
                                          setTitle={this.setTitle}></CycleWindow>;
                    break;
                case 2:
                    window = <LessonWindow user={this.state.activeUser}
                                           activeClass={this.state.activeClass}
                                           activeCycle={this.state.activeCycle}
                                           setTitle={this.setTitle}></LessonWindow>;
                    break;
            }
        } else {
            window = <Login login={this.state.login}
                            getUser={this.getUser}
                            setUser={this.setUser}
                            msg={this.state.error}
            ></Login>
        }

        return (
            <div className="container">
                <Appbar logout={this.logout}
                        setTheme={this.setTheme} user={this.state.activeUser}
                        setTitle={this.setTitle} title={this.state.title}>

                </Appbar>
                {window}
            </div>
        );
    }
}


function

Login(props) {
    // console.log(props.msg)
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let handleChange = (e) => {
        if (e.target.type === "password")
            setPassword(e.target.value)
        else
            setUsername(e.target.value)
    }
    let handleLogin = (event) => {
        // if(!username)
        //     username=null
        // if(!password)
        //     password=null
        if (username && password)
            props.getUser(username, password)
    }
    let handleSignup = (event) => {
        if (username && password) {

            props.setUser(username, password)
        }
    }

    return (
        <div className={"login_container"}>
            <div className={"login_window"}>
                <div className={'bt-3'}>
                    <p className={"label"}>Username :</p>
                    <input onChange={handleChange} className={'login_input'} type="text"/>
                </div>
                <div className={'bt-3'}>
                    <p className={"label"}>password :</p>
                    <input onChange={handleChange}
                           className={'login_input'} type="password"/>
                </div>
                <div className={'form_action'}>
                    <button className={'signup_button login_btn'} onClick={handleSignup}>Signup</button>
                    <button className={'login_button login_btn'} onClick={handleLogin}>Login</button>

                </div>
                <div className={"bt-3"}>
                    {props.msg}
                </div>

            </div>
        </div>
    );
}


export default App;

