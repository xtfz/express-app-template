const limits = require('../../data/limits');
const createLimiter = require('../../functions/createLimiter');

const fs = require('fs');
const _regEx = /(?:\.([^.]+))?$/;

const router = (app) => {
    fs.readdirSync(__dirname).forEach((file) => {
        const file_name = file.substring(0, file.lastIndexOf('.'));
        const file_extension = _regEx.exec(file);
        if (file_name == 'router' && file == 'router.js') return;
        const $data = require(`./${file_name}`);

        // Rate limiting
        let limitData;
        const limitExists = limits.find((l) => l.route === $data.route);
        if (limitExists && limitExists.route === $data.route) limitData = limitExists;

        if (limitExists && limitExists.route === $data.route) {
            const limiter = createLimiter(limitData.requests, limitData.time);
            app.use(`${$data.route}`, limiter);
        }

        app.get(`${$data.route}`, (req, res) => {
            $data.exec(req, res);
        });
    });
}

module.exports = router;