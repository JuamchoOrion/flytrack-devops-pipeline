import { useState } from 'react';
import { baggageApi } from '../services/api';

interface FormData {
    passenger_name: string;
    passenger_id:   string;
    flight_number:  string;
    issue_type:     'lost' | 'damaged' | 'delayed' | 'other';
    description:    string;
    contact:        string;
}

const EMPTY: FormData = {
    passenger_name: '',
    passenger_id:   '',
    flight_number:  '',
    issue_type:     'lost',
    description:    '',
    contact:        '',
};

const ISSUE_TYPES = [
    { value: 'lost',    label: 'Equipaje Perdido'   },
    { value: 'damaged', label: 'Equipaje Dañado'    },
    { value: 'delayed', label: 'Equipaje Retrasado' },
    { value: 'other',   label: 'Otro'               },
] as const;

const BaggageReport = () => {
    const [formData, setFormData] = useState<FormData>(EMPTY);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess]       = useState(false);
    const [error, setError]           = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            setError(null);
            const res = await baggageApi.create(formData);
            if (res.data.success) {
                setSuccess(true);
                setFormData(EMPTY);
                setTimeout(() => setSuccess(false), 6000);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al enviar reporte');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">

            {/* ── Header ── */}
            <div>
                <p className="text-[10px] font-bold text-sky-500/70 uppercase tracking-[0.2em] mb-2">Asistencia</p>
                <h1 className="text-[1.75rem] font-bold text-white tracking-tight leading-none">Reporte de Equipaje</h1>
                <p className="text-slate-500 text-sm mt-1.5">Informa un inconveniente con tu equipaje</p>
            </div>

            {/* ── Success banner ── */}
            {success && (
                <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/30">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-emerald-400">Reporte enviado exitosamente</p>
                        <p className="text-xs text-emerald-500/50 mt-0.5">
                            Nos pondremos en contacto contigo en 24–48 horas.
                        </p>
                    </div>
                </div>
            )}

            {/* ── Error banner ── */}
            {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-950/20">
                    <div className="w-7 h-7 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-red-400 mt-1">{error}</p>
                </div>
            )}

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="card space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="label">Nombre Completo</label>
                        <input
                            type="text" name="passenger_name" value={formData.passenger_name}
                            onChange={handleChange} required className="input-field"
                            placeholder="Juan Pérez"
                        />
                    </div>
                    <div>
                        <label className="label">Documento de Identidad</label>
                        <input
                            type="text" name="passenger_id" value={formData.passenger_id}
                            onChange={handleChange} required className="input-field"
                            placeholder="CC 1234567890"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="label">Número de Vuelo</label>
                        <input
                            type="text" name="flight_number" value={formData.flight_number}
                            onChange={handleChange} required className="input-field font-mono"
                            placeholder="AV123"
                        />
                    </div>
                    <div>
                        <label className="label">Tipo de Inconveniente</label>
                        <select
                            name="issue_type" value={formData.issue_type}
                            onChange={handleChange} required className="input-field"
                        >
                            {ISSUE_TYPES.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="label">Descripción del Problema</label>
                    <textarea
                        name="description" value={formData.description} onChange={handleChange}
                        required rows={4} className="input-field resize-none"
                        placeholder="Describe detalladamente el inconveniente con tu equipaje..."
                    />
                </div>

                <div>
                    <label className="label">Email de Contacto</label>
                    <input
                        type="email" name="contact" value={formData.contact}
                        onChange={handleChange} required className="input-field"
                        placeholder="tu@email.com"
                    />
                </div>

                <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: '1px solid rgba(148,163,184,0.08)' }}
                >
                    <button
                        type="button"
                        onClick={() => setFormData(EMPTY)}
                        className="btn-secondary"
                    >
                        Limpiar
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                        {submitting ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Enviando...
                            </>
                        ) : (
                            'Enviar Reporte'
                        )}
                    </button>
                </div>
            </form>

            {/* ── Info box ── */}
            <div className="card" style={{ background: 'rgba(8, 33, 65, 0.35)', borderColor: 'rgba(14,165,233,0.1)' }}>
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-sky-300 mb-2">Información Importante</p>
                        <ul className="text-xs text-sky-400/50 space-y-1.5">
                            <li>• Guarda tu número de reporte para seguimiento</li>
                            <li>• Recibirás una confirmación por email</li>
                            <li>• Tiempo de respuesta: 24–48 horas</li>
                            <li>• Línea de atención: 018000-EQUIPAJE</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BaggageReport;
