import './style.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img src="./logo.png" alt="logo"/>
            </div>
            <div className="sidebar__rooms">
                <div className="room--selected">
                    <h3>Room #1</h3>
                </div>
                <div className="room">
                    <h3>+ Add new</h3>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;