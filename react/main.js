/* Practical guide to learn React Basics Core Concepts */
/* All the examples are from React Documentation */

// Function Components

// With Arrow Function & Conditional (ternary) operator
const Title = ({ title }) => {
    return title.length > 4 ? <h1>Hello, {title}</h1> : <ActionLink />
}

// Function with event Handler
function ActionLink() {
    function handleClick(e) {
        e.preventDefault()
        console.log(Object.entries(self))
    }
    return (
        <a href="#" onClick={handleClick}>
            {' '}
            Inspector
        </a>
    )
}

// same funtion as above ES6

const Action = ({ action, fn }) => <a onClick={() => fn()}>{action}</a>
class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isToggleOn: true }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState((state) => ({ isToggleOn: !state.isToggleOn }))
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>
                    {' '}
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
                <Toggler bool={this.state.isToggleOn} />
            </div>
        )
    }
}

const Toggler = ({ bool }) => {
    return (
        <button onClick={() => console.log(!bool)}>
            the value is {bool ? 'false' : 'true'}
        </button>
    )
}

function ImageRender({ photos }) {
    const photoSet = photos
        .filter((item) => item.id < 10)
        .map((photo) => (
            <li key={photo.id}>
                <img src={photo.thumbnailUrl} />
                <p>{photo.title}</p>
            </li>
        ))
    return <ul>{photoSet}</ul>
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date(), photos: [], user: '', timer: 1 }
    }
    componentDidMount() {
        this.state.user = window.localStorage.getItem('user')
        this.clockID = setInterval(() => this.tick(), 1000)
        this.timerID = setInterval(() => this.timer(), 1000)
    }

    componentWillUnmount() {
        window.localStorage.clear()
        clearInterval(this.timerID)
        clearInterval(this.clockID)
    }
    fetchData() {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then((res) => res.json())
            .then((data) => this.setState({ photos: data }))
    }
    tick() {
        this.setState({ date: new Date() })
    }
    timer() {
        this.setState({ timer: this.state.timer + 1 })
    }
    render() {
        return (
            <div className="card mb-3">
                <div className="card-header row">
                    <h3 className="col-10 lead p-2">Timer</h3>
                    <h5 className="col-2 text-muted p2">
                        <small>{this.state.timer.toLocaleString()}</small>
                    </h5>
                </div>
                <h2>{this.state.date.toLocaleTimeString()}.</h2>
                <h3>last user was called {this.state.user}</h3>
            </div>
        )
    }
}

function UserGreeting(props) {
    return <h1>Welcome back! {props.user}</h1>
}
var globalUser = ''
const setUser = (val) => {
    globalUser = val
    window.localStorage.setItem('user', globalUser)
}

function GuestGreeting(props) {
    const [input, setInput] = React.useState('')
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
                    onClick={() => setUser(input)}
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
function LoginButton(props) {
    return (
        <button className="btn btn-secondary" onClick={props.onClick}>
            Clock
        </button>
    )
}
function ControlButton(props) {
    return (
        <button
            className={
                props.isLoggedIn ? 'btn btn-primary' : 'btn btn-secondary'
            }
            onClick={props.onClick}
        >
            {props.name}
        </button>
    )
}
function LogoutButton(props) {
    return (
        <button className="btn btn-secondary" onClick={props.onClick}>
            Home
        </button>
    )
}
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn
    if (isLoggedIn) {
        return (
            <div>
                <p className="lead"> loging at {props.timer}</p>
                <UserGreeting user={props.user} className="p-2" />
                <App />
            </div>
        )
    }
    return <GuestGreeting className="p-2" />
}
class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
        this.state = { isLoggedIn: false }
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true })
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false })
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn
        let control = (
            <ControlButton
                isLoggedIn={this.state.isLoggedIn}
                onClick={() => console.log('this')}
            />
        )
        let button
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }
        return (
            <div className="container-fluid">
                {button} {control} {control}

                <Greeting user={globalUser} isLoggedIn={isLoggedIn} />
            </div>
        )
    }
}
ReactDOM.render(<LoginControl />, document.getElementById('root'))
