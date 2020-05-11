export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ]
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const dayOfMonth = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return `${month} ${dayOfMonth} ${year} ${hour}:${min}:${sec}`
}