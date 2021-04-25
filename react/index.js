const SettingsContext = React.createContext() // We use create context for global settings

/* This is a minimal ReactApp setUp using cdn, we explore differents components and Syntax */

function LoginButton(props) {
    return (
        <button className="btn btn-outline-info" onClick={props.onClick}>
            <i className="fa fa-sign-in-alt" aria-hidden="true"></i>
        </button>
    )
}
/* Both buttons are similar in form we can make a more generic Button*/
function LogoutButton(props) {
    return (
        <button className="btn btn-outline-warning" onClick={props.onClick}>
            <i className="fa fa-sign-out-alt" aria-hidden="true" />
        </button>
    )
}
/* This button is more reusable & has better readability because destructuring */
function ControlButton({ onClick, name, isLoggedIn }) {
    return (
        <button
            className={
                // inside class we can create ternary to conditionaly render styles
                isLoggedIn ? 'btn btn-primary' : 'btn btn-secondary'
            }
            onClick={onClick}
        >
            {name}
        </button>
    )
}
/* Btn is even more reusable as allow us to change the icon, name & active state */
const Btn = ({ icon, name, isActive, onClick }) => (
    <i
        type="button"
        onClick={onClick}
        className={`fa fa-${icon} btn btn-outline-${
            isActive ? 'primary' : 'secondary'
        }`}
        id={name}
    ></i>
)
/* Title component is another example of using ternary */
const Title = ({ title }) => {
    return title.length > 4 ? <h1>Hello, {title}</h1> : <ActionLink />
}

/* ActionLink combined with Btn components creates reusable pieces of code */
function ActionLink() {
    function handleClick(e) {
        e.preventDefault()
        // Any Custom action
    }
    return (
        <Btn name="cogs" icon="cogs" isActive="false" onClick={handleClick} />
    )
}

/* MAIN COMPONENTS AREA */
/* Navegation is wrapped on LogingControl component*/
function Navigation({ button }) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    Task Manager
                </a>
                {button}
            </nav>
        </div>
    )
}
/* GREETINGS COMPONENT */
/* To understand state, we create a global user variable */
var globalUser = ''
/* Custom setState function for our globalUser var */
const setUser = (val) => {
    globalUser = val
    window.localStorage.setItem('user', JSON.stringify(globalUser))
}

function GuestGreeting(props) {
    const [input, setInput] = React.useState(props.user)
    return (
        <div className="container-flex m-3 p-2 bg-dark">
            <Title className="display-5" title={input} />
            <div className="row justify-content-center">
                <label htmlFor="user"></label>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input.name}
                    type="text"
                    className="col-8 form-control m-2"
                    name="name"
                    id="user"
                    aria-describedby="helpId"
                    placeholder="Type your name"
                />
                <button
                    onClick={() => setUser(input)} // We safe the user on LocalStorage!
                    type="button"
                    className="col-4 btn btn-secondary"
                >
                    Set
                </button>
            </div>
            <small id="helpId" className="form-text text-muted">
                v.1 @macizomedia
            </small>
        </div>
    )
}

/* Greeting is wrapped on loginControl Component & conditionally renders with isLoggedIn */
function Greeting(props) {
    // const prevUser = JSON.parse(window.localStorage.getItem('user'))
    const isLoggedIn = props.isLoggedIn
    /* Greeting is a nested component we want to set the user on our app context */
    const { settings, setSettings } = React.useContext(SettingsContext)
    if (isLoggedIn) {
        return (
            <div>
                <h5 className="display-5">Previous User </h5>
                <div>New user is {settings}</div>
                <button
                    className="btn btn-outline-danger"
                    onClick={() => setSettings(props.user)}
                >
                    Set Context
                </button>
            </div>
        )
    }
    return <GuestGreeting user="guest" className="p-2" />
}
/* TASK COMPONENTS */
const Task = ({ title, isDone, priority, timer }) => {
    return (
        <div>
            <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start active"
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className={isDone ? 'text-secondary' : 'mb-1'}>
                        {title}
                    </h5>
                    <small>{priority}</small>
                </div>
                <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit.
                </p>
                <small>{timer}</small>
            </a>
            <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start"
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <small className="text-muted">3 days ago</small>
                </div>
                <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit.
                </p>
                <small className="text-muted">
                    Donec id elit non mi porta.
                </small>
            </a>
        </div>
    )
}
const TaskListing = (props) =>
    props.arr.map(
        (item) => (
            console.log(item),
            (
                <Task
                    title={item.title}
                    key={item.id}
                    isDone="false"
                    priority={10}
                    timer={0}
                />
            )
        )
    )

const InputElem = ({ label, type, id, help, onChange, value }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                onChange={onChange}
                type={type}
                className="form-control"
                id={id}
                value={value}
                aria-describedby="emailHelp"
                placeholder={`enter ${id}`}
            />
            <small id="emailHelp" className="form-text text-muted">
                {help}
            </small>
        </div>
    )
}
/* TASK UTILS */
/* To understand state, we create a global user variable */
var taskList = []
/* Custom setState function for our globalTask var */
const saveTask = (val) => {
    taskList.push(val)
    window.localStorage.setItem(val.id, JSON.stringify(taskList))
}

/* CREATE TASK  */
class CreateTask extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            title: '',
            id: 3,
            isDone: false,
            timer: new Date(),
        }
    }
    handleClick(e) {
        this.setState({ title: e.target.value })
        e.target.value = ''
    }
    handleSubmit = (event) => {
        event.preventDefault()
        alert(`A task was added: ${JSON.stringify(this.state)}`)
        saveTask(this.state)
    }
    render() {
        return (
            <form
                className="form-group p-3"
                onSubmit={(event) => this.handleSubmit(event)}
            >
                <InputElem
                    label="enter task"
                    type="text"
                    id="taskInput"
                    help="What are we doing?"
                    value={this.state.title}
                    onChange={(e) =>
                        this.setState({
                            title: e.target.value,
                            id: Math.floor(Math.random() * 100),
                        })
                    }
                />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
/* AUTH CONTROL */
/* Login Component is wrap inside App */
class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = { isLoggedIn: false, storage: [] }
    }
    handleClick() {
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
    }
    componentDidMount() {}
    componentWillUnmount() {}
    render() {
        const isLoggedIn = this.state.isLoggedIn
        let button
        let tasklist = this.state.storage
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleClick} />
        } else {
            button = <LoginButton onClick={this.handleClick} />
        }
        return (
            <div>
                <Navigation button={button} />
                <Greeting user={globalUser} isLoggedIn={isLoggedIn} />
                <CreateTask />
                <TaskListing arr={tasklist} />
            </div>
        )
    }
}
/* App Component provides the context State */
function App() {
    const [settings, setSettings] = React.useState(null)

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            <LoginControl />
        </SettingsContext.Provider>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))

/* 
function allStorage() {
    var values = [],
    keys = Object.keys(localStorage),
        i = keys.length
    while (i--) {
        values.push(localStorage.getItem(keys[i]))
    }

    return values
}
this.state.storage = allStorage() */
