import ReactDOM from 'react-dom/client'
import './CSS/Home.css';
const root = ReactDOM.createRoot(document.getElementById("root"))

function Main() {
    return <div>My First Component!</div>
}

root.render(<Main />)