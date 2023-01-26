import { firebaseService } from './firebase.service.js'
import { eventBus } from './event-bus.service.js'

export const taskService = {
  query,
  getById: getTaskById,
  save: saveTask,
  remove: removeTask,
  getEmptyTask,
}


async function query(filterBy = {}) {
  return firebaseService.queryData(filterBy)
}

async function getTaskById(taskId) {
  return firebaseService.getEntityById(taskId)
}

async function saveTask(task) {
  return firebaseService.saveEntity(task)
}

async function removeTask(taskId) {
  eventBus.emit('removeTask', { txt: 'removed' })
  return firebaseService.removeEntity(taskId)
}



function getEmptyTask() {
  return {
    title: '',
    description: '',
    importance: 1,
    createdAt: Date.now() + '',
    doneAt: null,
    status: '',
    audioSrc: ''
  }
}

