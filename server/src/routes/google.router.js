const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: 'http://localhost:5173/',
  }),
//   async (req, res) => {
//     const { user } = req;
//     res.redirect(`http://localhost:5173/?user=${JSON.stringify(user)}`);
//   },
);

// router.get('/login/success', (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       error: false,
//       message: 'Successfully Loged In',
//       user: req.user,
//     });
//   } else {
//     res.status(403).json({ error: true, message: 'Not Authorized' });
//   }
// });

module.exports = router;
