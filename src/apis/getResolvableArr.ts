export default (vol: number, col: number) => {
  const maxNum = vol * col - 1
  const arr = []
  for (let i = 0; i < maxNum; ++i) {
    arr[i] = i
    const randomIndex = Math.floor(Math.random() * i)
    const t: number = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = t
  }
  arr[maxNum] = maxNum

  let count = 0 // 计算逆序数有几个
  for (let i = 0; i < maxNum; ++i) {
    for (let j = i + 1; j < maxNum; ++j) {
      if (arr[i] > arr[j]) count++
    }
  }
  if (count % 2 === 1) {
    const t = arr[maxNum - 1]
    arr[maxNum - 1] = arr[maxNum - 2]
    arr[maxNum - 2] = t
  }

  return arr
}
