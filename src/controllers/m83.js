const model = require('../models/m83')

function getAll(req, res, next){
  const data = model.getAll()
  res.status(200).send({ data })
}

function getOne(req, res, next){
  const song = model.getOne(req.params.id)
  if (song.data){
    return res.status(200).send({data : song.data})
  } else {
    return next({status: 404, message: song.error})
  }
}

function create(req, res, next){
  const result = model.create(req.body)

  if (result.errors){
    return next({ status: 400, message: `Could not create new song`, errors: result.errors })
  }
  res.status(201).json({ data: result })
}

function update(req, res, next){
  const song = model.update(req.params.id, req.body.rating, req.body.playlist)

  if (song.data){
    return res.status(200).send({data: song.data})
  }
  else if (song.error){
    return next({status: 404, message: song.error})
  }
}

function destroy(req, res, next){
  const song = model.destroy(req.params.id)
  if (song.data){
    return res.status(200).send({data: song.data})
  }
  else if (song.error){
    return next({status: 404, message: song.error})
  }
}

module.exports = { getAll, getOne, create, update, destroy }
