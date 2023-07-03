import express from 'express';

import {signin, signup} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.get("/logout",  (req, res) => {

    req.logout();
    res.clearCookie('session');
 	res.redirect("http://localhost:3000/auth");
    
 });

export default router;