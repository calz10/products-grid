const formatter = {
  dateFormatter: (time) => {
    /**
     * milleconds convertions of second, min,hour,day, week
     */
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7

    /**
     * function that will convert time string to plural or singular
     * @param {*} time, time difference 
     * @param {*} type , type of type if in second, hour, etc.
     */
    const getTime = (time, type) => `${type}${time > 1 ? 's' : ''} ago`

    /**
     * get current milleseoconds diff from given time
     */
    const diffFromNow = new Date() - new Date(time)

    /**
     * checks condtions and return string type of time
     */
    if (diffFromNow < minute) {
      const timeDiff = Math.floor(diffFromNow / second)
      return `${timeDiff} ${getTime(timeDiff, 'second')}`
    }
    if (diffFromNow < hour) {
      const timeDiff = Math.floor(diffFromNow / minute)
      return `${timeDiff} ${getTime(timeDiff, 'minute')}`
    }
    if (diffFromNow < day) {
      const timeDiff = Math.floor(diffFromNow / hour)
      return `${timeDiff} ${getTime(timeDiff, 'hour')}`
    }
    if (diffFromNow < week) {
      const timeDiff = Math.floor(diffFromNow / day)
      return `${timeDiff} ${getTime(timeDiff, 'day')}`
    }
    return new Date(time).toLocaleString()
  }
}

/**
 * 
 * @param {*} data , array where the condition could be apply
 * it generates random number as key or id for every after 20 items starts from 1
 * it ensures unique values to be given
 */
const generateIds = (data) => {
  return data.reduce((acc, _,i) => {
    if((i+1) % 20 === 1 && i > 20) {
      /**
       * randomize number up to 100 and adds up additional division
       */
      const random = (Math.floor((Math.random() * 100)) + 1) + (Math.round(((i+1) - 1) / 20))

      /**
       *  values of object should not include the random number
       */
      const doesInclude = Object.values(acc).includes(random)
      if(!doesInclude) {
        /** if not it will be added as new value  */
        acc[i+1] = random
      }
    }
    return acc
  }, {})
}


export { formatter, generateIds }