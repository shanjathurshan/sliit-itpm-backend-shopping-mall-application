const express = require('express')
const router = express.Router()
const gameController = require('./gameController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const multer = require('multer');
const { createGameSchema, updateGameSchema, getGameByGameIdSchema, getGameByIdSchema, deleteGameSchema } = require('./gameValidations')
const app = express();


// router.use(verifyJWT)
multer({ dest: 'uploads/' }); 

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, 'uploads')
    },
    filename: (req, file, cb)=>{
      cb(null, Date.now()+ '-'+ file.originalname)
    }
  })
  
//   # Then we will set the storage 
  const upload = multer({ storage: storage })


app.post('/submit-form', (req, res) => {
    // Access form data from req.body
    const formData = req.body;
    
    // Process the form data
    console.log('Received form data:', formData);
  
    // Respond with a success message
    res.send('Form submitted successfully');
  });

// router.use('/submit-forms',validateRequest(createGameSchema), gameController.createNewGame);


router.route('/')
    .get(gameController.getAllGames)
    .post(upload.single('image'), validateRequest(createGameSchema), gameController.createNewGame)
    .patch(validateRequest(updateGameSchema), gameController.updateGame)
    .delete(validateRequest(deleteGameSchema), gameController.deleteGame)

router.route('/id')
    .get(validateRequest(getGameByIdSchema), gameController.getGameByGameId)

router.route('/sid')
    .get(validateRequest(getGameByGameIdSchema), gameController.getGameByGameId)

router.route('/courses')
    .get(gameController.getGameEnrolledCourses)

module.exports = router 