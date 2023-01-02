import './styles.css';

const Home = () => {
    return (
        <div className="home">
            <img className="logo" src="./logo.png" alt="logo" />
            <div className="home__content">
                <h1 className="header">witaj w <p className="header--accent">POTATO CHAT!</p></h1>
                <p className="text">Kliknij w przycisk poniżej i dostań odpowiedź na swoje pytania!</p>
                <button className="cta-btn">Otwórz pokój chatu!</button>
            </div>
        </div>
    )
}

export default Home;