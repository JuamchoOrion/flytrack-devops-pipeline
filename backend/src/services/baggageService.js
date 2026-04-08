import baggageRepository from '../repositories/baggageRepository.js';

class BaggageService {
    async getAllReports() {
        try {
            const reports = baggageRepository.findAll();
            return {
                success: true,
                data: reports,
                count: reports.length
            };
        } catch (error) {
            throw new Error(`Error al obtener reportes: ${error.message}`);
        }
    }

    async getReportById(id) {
        try {
            const report = baggageRepository.findById(id);

            if (!report) {
                return {
                    success: false,
                    message: 'Reporte no encontrado'
                };
            }

            return {
                success: true,
                data: report
            };
        } catch (error) {
            throw new Error(`Error al obtener reporte: ${error.message}`);
        }
    }

    async createReport(reportData) {
        try {
            const report = baggageRepository.create(reportData);

            return {
                success: true,
                data: report,
                message: 'Reporte creado exitosamente'
            };
        } catch (error) {
            throw new Error(`Error al crear reporte: ${error.message}`);
        }
    }

    async updateReportStatus(id, status) {
        try {
            const existing = baggageRepository.findById(id);
            if (!existing) {
                return {
                    success: false,
                    message: 'Reporte no encontrado'
                };
            }

            const updated = baggageRepository.updateStatus(id, status);

            return {
                success: true,
                data: updated,
                message: 'Estado actualizado exitosamente'
            };
        } catch (error) {
            throw new Error(`Error al actualizar estado: ${error.message}`);
        }
    }
}

export default new BaggageService();