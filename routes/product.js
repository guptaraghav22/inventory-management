const router = require('express')();



router.get('/', (req, res, next) => {
  res.send('This works 1');
})

router.post('/add', (req, res, next) =>{
  res.send('This works 2');
})

router.put('/:id', (req, res, next) => {
  console.log('PARAMS: ', req.params);
  res.send('This works 3');
})

router.delete('/:id', (req, res, next) => {
  console.log('PARAMS: ', req.params);
  res.send('This works 4');
})

module.exports = router;
