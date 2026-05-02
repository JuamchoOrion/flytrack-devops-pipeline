import { vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BaggageReport from '../pages/BaggageReport';
import { baggageApi } from '../services/api';

vi.mock('../services/api', () => ({
    baggageApi: {
        create: vi.fn(() => Promise.resolve({ data: { success: true, data: {} } }))
    }
}));

test('submits baggage report form successfully', async () => {
    render(<BaggageReport />);

    fireEvent.change(screen.getByPlaceholderText(/Juan Pérez/i), { target: { value: 'Ana Torres' } });
    fireEvent.change(screen.getByPlaceholderText(/CC 1234567890/i), { target: { value: 'CC789456' } });
    fireEvent.change(screen.getByPlaceholderText(/AV123/i), { target: { value: 'FT300' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'lost' } });
    fireEvent.change(screen.getByPlaceholderText(/Describe detalladamente el inconveniente/i), { target: { value: 'Maleta perdida' } });
    fireEvent.change(screen.getByPlaceholderText(/tu@email.com/i), { target: { value: 'ana.torres@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /Enviar Reporte/i }));

    await waitFor(() => {
        expect(screen.getByText(/Reporte enviado exitosamente/i)).toBeInTheDocument();
    });

    expect(baggageApi.create).toHaveBeenCalled();
});
