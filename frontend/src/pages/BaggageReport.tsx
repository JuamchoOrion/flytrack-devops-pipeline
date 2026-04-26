import { useState } from 'react';
import { baggageApi } from '../services/api';

interface FormData {
    passenger_name: string;
    passenger_id: string;
    flight_number: string;
    issue_type: 'lost' | 'damaged' | 'delayed' | 'other';
    description: string;
    contact: string;
}

const BaggageReport = () => {
    const [formData, setFormData] = useState<FormData>({
        passenger_name: '',
        passenger_id: '',
        flight_number: '',
        issue_type: 'lost',
        description: '',
        contact: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setError(null);

            const response = await baggageApi.create(formData);

            if (response.data.success) {
                setSuccess(true);
                setFormData({
                    passenger_name: '',
                    passenger_id: '',
                    flight_number: '',
                    issue_type: 'lost',
                    description: '',
                    contact: '',
                });

                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al enviar reporte');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Reporte de Equipaje</h1>
                <p className="text-gray-600">Informa sobre inconvenientes con tu equipaje</p>
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    ✅ Reporte enviado exitosamente. Nos pondremos en contacto contigo pronto.
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    ❌ {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">Nombre Completo</label>
                        <input
                            type="text"
                            name="passenger_name"
                            value={formData.passenger_name}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Juan Pérez"
                        />
                    </div>

                    <div>
                        <label className="label">Documento de Identidad</label>
                        <input
                            type="text"
                            name="passenger_id"
                            value={formData.passenger_id}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="CC 1234567890"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">Número de Vuelo</label>
                        <input
                            type="text"
                            name="flight_number"
                            value={formData.flight_number}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="AV123"
                        />
                    </div>

                    <div>
                        <label className="label">Tipo de Inconveniente</label>
                        <select
                            name="issue_type"
                            value={formData.issue_type}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="lost">Equipaje Perdido</option>
                            <option value="damaged">Equipaje Dañado</option>
                            <option value="delayed">Equipaje Retrasado</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="label">Descripción del Problema</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="input-field"
                        placeholder="Describe detalladamente el inconveniente con tu equipaje..."
                    />
                </div>

                <div>
                    <label className="label">Email de Contacto</label>
                    <input
                        type="email"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="tu@email.com"
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setFormData({
                            passenger_name: '',
                            passenger_id: '',
                            flight_number: '',
                            issue_type: 'lost',
                            description: '',
                            contact: '',
                        })}
                        className="btn-secondary"
                    >
                        Limpiar
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Enviando...' : 'Enviar Reporte'}
                    </button>
                </div>
            </form>

            <div className="card bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-2">Información Importante</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Guarda tu número de reporte para seguimiento</li>
                    <li>Recibirás una confirmación por email</li>
                    <li>El tiempo de respuesta es de 24-48 horas</li>
                    <li>Puedes llamar al 018000-EQUIPAJE para más información</li>
                </ul>
            </div>
        </div>
    );
};

export default BaggageReport;