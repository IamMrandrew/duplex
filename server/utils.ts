export const isEmail = (target: string): boolean => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(target).toLowerCase())
}

export const ONE_DAY = 86400000
export const ONE_WEEK = ONE_DAY * 7
export const ONE_MONTH = ONE_DAY * 30
export const ONE_YEAR = ONE_DAY * 365

import { Response } from 'express'

// for critical logs that require timestamp and highlights
export const log = (message: string): void => {
  const curTime = new Date(Date.now()).toISOString()
  console.log(`%c[${curTime}] ${message}`, 'color: orange;') // just playing with log colors
}

// send error and log it on console
// @param code is the html code
// @param msgToSend is the message to send via res
// @param msgToLog is the message to log in console ( usually the full error stack)
export const sendError = (res: Response, code: number, msgToSend: string, msgTolog: string = ''): void => {
  log(`${code} "${msgTolog || msgToSend}"`)
  res.status(code).json({ message: msgToSend })
}