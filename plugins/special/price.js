exports.run = {
   usage: ['premium'],
   async: async (m, {
      client,
      isPrefix
   }) => {
      client.reply(m.chat, `tingkatkan ke premium hanya Rp. 5.000,- untuk mendapatkan batas 1K Limit, send *${isPrefix}owner* if want to buy.`, m)
   },
   error: false,
   cache: true,
   location: __filename
}
