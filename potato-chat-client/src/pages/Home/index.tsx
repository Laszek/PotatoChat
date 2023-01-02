import './style.css';

export interface Props {
    /* function to change state isChatOpened at App component */
    onJoinToChat: () => void;
}

const Home: React.FC<Props> = ({onJoinToChat}) => {
    return (
        <div className="home">
            <img className="home__logo" src="./logo.png" alt="logo" />
            <div className="home__content">
                <h1 className="header">witaj w <p className="header--accent">POTATO CHAT!</p></h1>
                <p className="text">Kliknij w przycisk poniżej i dostań odpowiedź na swoje pytania!</p>
                <button className="cta-btn" onClick={onJoinToChat}>Otwórz pokój chatu!</button>
            </div>
        </div>
    )
}

export default Home;