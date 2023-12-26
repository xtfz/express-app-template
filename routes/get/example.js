module.exports = {
    route: '/example',
    exec: async (req, res) => {
        res.json({
            hello: 'world GET'
        });
    },
}