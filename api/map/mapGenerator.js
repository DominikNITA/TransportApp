const { Math } = require('core-js')
const request = require('request')

const generateNewMap = async function (options) {
  const width = options.width ?? 2000
  const height = options.height ?? 2000
  const targetStationsCount = options.stationsCount ?? 30
  const averageDistance = options.averageDistance ?? 400
  const mergeDistance = options.mergeDistance ?? 300
  const stationsNames = [
    ...new Set(await getRandomStationsNames(targetStationsCount * 2)),
  ]
  //console.log(stationsNames)
  var stations = []
  var lines = []
  //Main loop
  while (targetStationsCount - stations.length > 1) {
    //Create new Line
    // console.log('-New Line created')
    const line = createNewLine(lines)
    const startPoint = createRandomPoint(width, height)
    const endPoint = createRandomPoint(width, height)
    let lastStationPosition = startPoint
    let tempStations = []
    //Stations loop
    while (
      targetStationsCount - stations.length - tempStations.length > 0 &&
      distance(endPoint, lastStationPosition) > 300
    ) {
      const dx = endPoint.x - lastStationPosition.x
      const dy = endPoint.y - lastStationPosition.y
      const h = distance(endPoint, lastStationPosition)
      const d = averageDistance - 50 + Math.random() * 100
      //Get position of next station
      const stationPosition = {
        x: Math.trunc(lastStationPosition.x + (d * dx) / h),
        y: Math.trunc(lastStationPosition.y + (d * dy) / h),
      }
      // console.log('Generated station position:')
      // console.log(stationPosition)
      //If position close to another existin station then merge
      const stationToMerge = stations.find(
        (st) => distance(st.position, stationPosition) <= mergeDistance
      )
      if (stationToMerge) {
        line.stations.push(stationToMerge)
        //Modify station directly in array: https://stackoverflow.com/a/61586616/13251554
        stations.find(
          (s) =>
            s.id === stationToMerge.id &&
            (s.linesNumbers.push(line.number), true)
        )
        lastStationPosition = stationToMerge.position
        console.log('Merge occured for station: ' + stationToMerge.name)
      } else {
        //Else create new Station
        const station = createNewStation(
          stationPosition,
          stationsNames,
          stations.length + tempStations.length,
          line.number
        )
        tempStations.push(station)
        line.stations.push(station)
        lastStationPosition = stationPosition
      }
    }

    if (
      line.stations.length > 2 &&
      !lines.some((l) => line.stations.every((s) => l.stations.includes(s)))
    ) {
      lines.push(line)
      stations.push(...tempStations)
    } else {
      stations.forEach(
        (s) =>
          (s.linesNumbers = s.linesNumbers.filter((n) => n !== line.number))
      )
    }
  }
  console.log(`Generated ${lines.length} lines`)
  return {
    lines: lines,
    stations: stations,
    width: width,
    height: height,
    createdOn: Date.now(),
  }
}

function distance(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

function createRandomPoint(maxX, maxY) {
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  }
}

function createNewLine(lines) {
  //Get number
  const lineNumber = lines.length + 1

  //Generate color
  const lineColor = getRandomDistinguishableColor(lineNumber)
  //Insert to the array
  return {
    number: lineNumber,
    color: lineColor,
    stations: [],
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getRandomDistinguishableColor(number) {
  const hue = number * 137.508 // use golden angle approximation
  return `hsl(${hue},63%,61%)`
}

function downloadNames(count) {
  var options = {
    method: 'POST',
    url: 'https://random.api.randomkey.io/v1/location',
    headers: {
      auth: 'd2efd11d1a2fd0827aaf6b559a9401b9',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ region: 'uk', records: count }),
  }
  return (promise = new Promise((resolve, reject) => {
    request(options, function (error, response) {
      //&& response.statusCode == 200
      if (error) {
        reject(error)
      } else {
        resolve(JSON.parse(response.body))
      }
    })
  }))
}

async function getRandomStationsNames(count) {
  try {
    const resp = await downloadNames(count)
    const result = resp.location.map((x) => x[1])
    return result
  } catch (error) {
    console.error('ERROR: ' + error)
  }
}

function createNewStation(position, stationsNames, index, lineNumber) {
  return {
    position: position,
    name: stationsNames[index % stationsNames.length],
    id: index,
    linesNumbers: [lineNumber],
  }
}

module.exports = generateNewMap
