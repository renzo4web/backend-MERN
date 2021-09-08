const moment = require('moment');

const isDate = (value, { req, location, path }) => {
    console.log(value);

    if (!value) {
        return false;
    }

    const date = moment(value);

    return date.isValid();
};

module.exports = {
    isDate,
};
