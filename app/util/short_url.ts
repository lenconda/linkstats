import axios from 'axios'
import qs from 'qs'

export const generateShortURL = async (longurl: string) => {
  const form = qs.stringify({ longurl })
  const { data } = await axios
      .post('http://qvni.cn/t.cn/ajax.php',
      form,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  return data
}
