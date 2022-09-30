import {httpService} from './http.service.js';

const ENDPOINT = 'photo';

async function query(filterBy) {
  return await httpService.get(ENDPOINT, filterBy);
}

async function getById(photoId) {
  return await httpService.get(`${ENDPOINT}/${photoId}`);
}

async function remove(photoId) {
  return await httpService.delete(`${ENDPOINT}/${photoId}`);
}

async function save(photo) {
  var photo = JSON.parse(JSON.stringify(photo));
  if (photo._id) {
    return await httpService.put(`${ENDPOINT}/${photo._id}`, photo);
  } else {
    return await httpService.post(ENDPOINT, photo);
  }
}

// async function addReview(photoId, review) {
//     return await httpService.post(`${ENDPOINT}/${photoId}/review`, review);
// }

function getEmptyPhoto() {
  var empty = {
    label: '',
    imgUrl: '',
  };
  return empty;
}

export const photoService = {
  query,
  getById,
  getEmptyPhoto,
  remove,
  save,
  // addReview
};
