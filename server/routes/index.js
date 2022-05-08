const Router = require('express').Router
const Controllers = require('../controllers')

const router = new Router()

router.post('/request-asset', Controllers.Main.requestAsset);
router.post('/set-base-uri', Controllers.Main.setBaseUri);
router.post('/mint', Controllers.Main.mint);

module.exports = router;
