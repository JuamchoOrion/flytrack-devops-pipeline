import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Flights from './pages/Flights';
import Notifications from './pages/Notifications';
import BaggageReport from './pages/BaggageReport';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/flights" element={<Flights />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/baggage-report" element={<BaggageReport />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;