import fetch from 'node-fetch'
let handler = async (m, { text }) => {
  try {
    let api = await fetch(`https://api.ordiston.xyz/main/statistic`)
    let body = await api.text()
    m.reply(body)  
  } catch (e) {
    console.log(e) 
    m.reply(eror)
  }
}          
handler.command = handler.help = ['statistic'];
handler.tags = ['main'];

export default handler