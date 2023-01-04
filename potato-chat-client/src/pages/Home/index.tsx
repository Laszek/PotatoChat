import './style.css';

interface Props {
    /* function to change state isChatOpened at App component */
    onJoinToChat: () => void;
}

const Home: React.FC<Props> = ({ onJoinToChat }) => {
    return (
        <div className="home">
            <img className="home__logo" src="./logo.png" alt="logo" />
            <div className="home__content">
                <h1 className="header">Welcome to <p className="header--accent">POTATO CHAT!</p></h1>
                <p className="text">Continue with a button below and get answer to any question!</p>
                <button className="cta-btn" onClick={onJoinToChat}>Join to Chat Room!</button>
            </div>
        </div>
    )
}

export default Home;