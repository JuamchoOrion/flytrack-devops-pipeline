import flightService from '../services/flightService.js';

export async function getAllFlights(req, res, next) {
    try {
        const result = await flightService.getAllFlights();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function getFlightById(req, res, next) {
    try {
        const { id } = req.params;
        const result = await flightService.getFlightById(parseInt(id));

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function searchFlights(req, res, next) {
    try {
        const { query } = req.query;
        const result = await flightService.searchFlights(query);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function createFlight(req, res, next) {
    try {
        const result = await flightService.createFlight(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateFlight(req, res, next) {
    try {
        const { id } = req.params;
        const result = await flightService.updateFlight(parseInt(id), req.body);

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
}