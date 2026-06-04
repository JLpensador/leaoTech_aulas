import NavigationBar from './components/NavigationBar.jsx'
import MainContent from './components/MainContent.jsx'
import Footer from './components/Footer.jsx'

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavigationBar />
            <main className="container my-5 flex-grow-1">
                <MainContent />
            </main>
            <Footer />
        </div>
    )
}

export default App
