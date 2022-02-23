const asyncWrapper = (asyncRouteHandler) =>
    // this is what will be called by express.js
    async (req, res, next) => {
        // because it's an async function it will always return a promise
        // – just call it with express' callback parameters
        try {
            const result = await asyncRouteHandler(req, res, next);
            return res.send(result);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

module.exports = {
    asyncWrapper,
};
