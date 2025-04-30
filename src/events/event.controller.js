import Event from './event.model.js';

export const createEvent = async (req, res) => {
    try {
        const { event, cronograma, time, hotel, role } = req.body;

        const existingEvent = await Event.findOne({ event, hotel, cronograma });
        if (existingEvent) {
            return res.status(400).json({
            success: false,
            message: "Ya existe un evento con el mismo nombre en esta fecha y hotel",
        });
    }

        const newEvent = new Event({ event, cronograma, time, hotel, role });
        await newEvent.save();

        res.status(201).json({
            success: true,
            message: "Evento creado exitosamente",
            event: newEvent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el evento",
            error,
        });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { event, cronograma, time, hotel, role } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
        id,
            { event, cronograma, time, hotel, role },
            { new: true }
        );

        if (!updatedEvent) {
        return res.status(404).json({
            success: false,
            message: "Evento no encontrado",
        });
        }

        res.status(200).json({
            success: true,
            message: "Evento actualizado exitosamente",
            event: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el evento",
            error,
        });
    }
};

export const listEvents = async (req, res) => {
    try {
        const events = await Event.find({ estado: true });

        res.json({
            success: true,
            events,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los eventos",
            error,
        });
    }
};

export const cancelEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
        return res.status(404).json({
            success: false,
            message: "Evento no encontrado",
        });
        }
        event.estado = false;
        await event.save();

        res.status(200).json({
            success: true,
            message: "Evento cancelado exitosamente",
            event,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al cancelar el evento",
            error,
        });
    }
};
