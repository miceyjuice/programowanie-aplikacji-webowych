const controller = require('../controllers/category.controller');

module.exports = app => {
    app.get('/categories', controller.getAll);
    app.post('/categories', controller.add);
    app.put('/categories', controller.update);
    app.delete('/categories/:id', controller.delete);
}