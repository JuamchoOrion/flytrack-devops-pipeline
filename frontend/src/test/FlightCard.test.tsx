import { render, screen } from '@testing-library/react';
import FlightCard from '../components/FlightCard';

test('renders flight card with flight details', () => {
    render(
        <FlightCard
            flight={{
                id: 1,
                flight_number: 'FT100',
                airline: 'AeroPuerto Smart',
                origin: 'BOG',
                destination: 'MIA',
                departure_time: '2026-12-01T08:00:00Z',
                arrival_time: '2026-12-01T12:00:00Z',
                status: 'boarding',
                gate: 'A12',
                created_at: '2026-01-01T00:00:00Z',
                updated_at: '2026-01-01T00:00:00Z'
            }}
        />
    );

    expect(screen.getByText('FT100')).toBeInTheDocument();
    expect(screen.getByText('AeroPuerto Smart')).toBeInTheDocument();
    expect(screen.getByText('MIA')).toBeInTheDocument();
    expect(screen.getByText('A12')).toBeInTheDocument();
    expect(screen.getByText('Embarcando')).toBeInTheDocument();
});
