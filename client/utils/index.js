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

export default formatter