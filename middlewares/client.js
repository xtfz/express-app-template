const clientInfo = async (req, res, next) => {
    const data = await fetch(`https://ipapi.co/json`).then((r) => r.json());
    if(!data) req.client = {};
    else req.client = data;
    next();
}

module.exports = clientInfo;