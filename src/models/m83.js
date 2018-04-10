const uuid = require('uuid/v4')
let m83 = []

function getAll(){
  return {data: m83}
}

function getOne(id){
  const foundSong = m83.find(song => song.id === id)
  return foundSong ? {data: foundSong} : { error: 'No song found with that ID'}
}

function create(body){
  const errors = []
  const name = body.name
  let rating = body.rating
  let playlist = body.playlist
  let response;

  if (rating){
    rating = `${body.rating} / 5`
  } else if (!rating){
    rating = '2.5 / 5'
  }
  if(!playlist){
    playlist = 'Not yet saved to Playlist'
  }
  if (!name) {
    errors.push('name is required')
    response = { errors }
  }
  else {
    const newSong = { id: uuid(), name, rating, playlist}
    m83.push(newSong)
    response = newSong
  }
  return response
}


function update(id, rating, playlist){
  const foundSong = m83.find(song => song.id === id)
  if (foundSong){
    if (rating){
    foundSong.rating = `${rating} / 5`
    }
    if (playlist){
      foundSong.playlist = `${playlist}`
    }
    return {data: foundSong}
    } else {
    return {error: 'Song Not found'}
  }
}

function destroy(id){
  const foundSong = m83.find(song => song.id === id)
  if (foundSong){
    m83 = m83.filter(song => song.id !== id)
    delete foundSong.id
    return {data: foundSong}
  } else {
    return {error: 'Song Not Found'}
  }
}

module.exports = { getAll, getOne, create, update, destroy }
