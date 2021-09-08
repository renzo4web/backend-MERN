/* 
    Events Routes

    /api/events

*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validate');
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
// validate all JWT

// get events

router.use(validateJWT);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'Title must be provided').not().isEmpty(),
        check('start', 'Start date must be provided').custom(isDate),
        check('end', 'End Date must be provided').not().isEmpty(isDate),
        validateFields,
    ],
    createEvent
);

router.put(
    '/:id',
    [
        check('title', 'Title must be provided').not().isEmpty(),
        check('start', 'Start date must be provided').custom(isDate),
        check('end', 'End Date must be provided').not().isEmpty(isDate),
        validateFields,
    ],
    updateEvent
);

router.delete(
    '/:id',

    deleteEvent
);

module.exports = router;
