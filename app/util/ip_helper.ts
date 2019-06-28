import axios from 'axios'
import { IPLocation } from '../interfaces'
import cheerio from 'cheerio'


export const getGeoInfo = async (ip: string, timeout: number = 15000): Promise<IPLocation> => {
  axios.defaults.timeout = timeout
  try {
    const { data } = await axios.get(`https://www.geoiptool.com/en/?ip=${ip}`)
    const $ = cheerio.load(data)
    const dataItems = $('div.sidebar-data > div.data-item').toArray().slice(2)
    const items = dataItems.map((value, index) =>
        $(value).find('span[class!="bold"]')
        .text()
        .trim())
    return {
      country: items[0],
      countryCode: items[1],
      region: items[2],
      city: items[3],
      latitude: items[6],
      longitude: items[7]
    }
  } catch (e) {
    return {
      country: '',
      countryCode: '',
      region: '',
      city: '',
      latitude: '',
      longitude: ''
    }
  }
}
