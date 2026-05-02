import { render, screen } from '@testing-library/react';
import NotificationCard from '../components/NotificationCard';

test('renders notification card with priority and message', () => {
    render(
        <NotificationCard
            notification={{
                id: 1,
                flight_id: 1,
                flight_number: 'FT200',
                type: 'gate change',
                message: 'Puerta cambiada a A15',
                priority: 'urgent',
                airline: 'AeroPuerto Smart',
                origin: 'BOG',
                destination: 'MIA',
                created_at: new Date().toISOString()
            }}
        />
    );

    expect(screen.getByText('FT200')).toBeInTheDocument();
    expect(screen.getByText('Puerta cambiada a A15')).toBeInTheDocument();
    expect(screen.getByText('AeroPuerto Smart')).toBeInTheDocument();
    expect(screen.getByText(/🚨|🚨/)).toBeInTheDocument();
});
