import axios from 'axios'
import { IPLocation } from '../interfaces'

export const getGeoInfo = async (ip: string, timeout: number = 60000): Promise<IPLocation> => {
  axios.defaults.timeout = timeout
  try {
    const { data } = await axios.get(`https://api.ip.sb/geoip/${ip}`)
    const { country, country_code, region, city, latitude, longitude } = data
    return {
      country,
      countryCode: country_code,
      region,
      city,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    }
  } catch (e) {
    return {
      country: '',
          countryCode: '',
          region: '',
          city: '',
          latitude: '',
          longitude: '',
    }
  }
}
