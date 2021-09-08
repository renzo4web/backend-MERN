const Event = require('../models/Event');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('user', 'name');

        return res.status(200).json({
            ok: true,
            events,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Please contact your database administrator',
        });
    }
};

const createEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
        // ADD event to db and send id

        event.user = req.uid;

        const savedEvent = await event.save();

        return res.status(200).json({
            ok: true,
            msg: `Event created`,
            event: savedEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Event cannot be created',
        });
    }
};

const updateEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);

        console.log(event);

        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event not found in database',
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User do not have privileges to edit this event',
            });
        }

        const updateEvent = {
            ...req.body,
            user: req.uid,
        };

        const eventUpdated = await Event.findByIdAndUpdate(
            eventId,
            updateEvent
        );

        return res.status(200).json({
            ok: true,
            event: updateEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Event cannot be updated',
        });
    }
};

const deleteEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event not found in database',
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User do not have privileges to delete this event',
            });
        }

        await Event.findByIdAndDelete(eventId);

        return res.status(200).json({
            ok: true,
            msg: 'Event Deleted',
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: `Event cannot be deleted`,
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
