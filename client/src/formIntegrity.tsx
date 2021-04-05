type Validator = {
  id: number
  errMsg: string
  check: (target: string) => boolean
}

type Target = {
  value: string
  errMsg: string
}

const REQUIRED: Validator = {
  id: 1,
  errMsg: 'This field cannot be empty.',
  check: (target: string): boolean => {
    return target.length !== 0
  },
}

const EMAIL: Validator = {
  id: 2,
  errMsg: 'Please enter a valid email.',
  check: (target: string): boolean => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(target).toLowerCase())
  },
}

const NUM_AND_LETTER: Validator = {
  id: 3,
  errMsg: 'Mixture of number and letter is required.',
  check: (target: string): boolean => {
    const regex = /^[0-9a-zA-Z]+$/
    return regex.test(target)
  },
}

const SPECIAL_CHAR: Validator = {
  id: 4,
  errMsg: 'Inclusion of special character, e.g. ! @ # ? ] is required.',
  check: (target: string): boolean => {
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    return regex.test(target)
  },
}
const LENGTH_EIGHT: Validator = {
  id: 5,
  errMsg: 'At least 8 characters required.',
  check: (target: string): boolean => {
    return target.length > 7
  },
}

// check whether the target passes the integrity test
// @return original Target if passes all validators
// @return modified errMsg if fails 1 validator
export const checkIntegrity = (target: Target, validators: Array<Validator>): Target => {
  validators.some((validator) => {
    if (!validator.check(target.value)) return (target.errMsg = validator.errMsg)
  })
  return target
}

export const VALIDATORS = {
  REQUIRED,
  EMAIL,
  NUM_AND_LETTER,
  SPECIAL_CHAR,
  LENGTH_EIGHT,
}

/**
 * Usage:
 * const email = checkIntegrity(input.email, [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
 */
