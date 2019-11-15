import axios from 'axios'
import qs from 'qs'
import cheerio from 'cheerio'

export const generateShortURL = async (longurl: string) => {
  const form = qs.stringify({ longurl })
  const { data } = await axios
  .post('https://tool.chinaz.com/tools/dwz.aspx',
      form,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  const $ = cheerio.load(data)
  return $('#shorturl').text()
}
