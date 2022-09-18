exports.run = {
   async: async (m, {
      client,
      body,
      users,
      groupSet,
      setting,
      isAdmin,
      isBotAdmin
   }) => {
      try {
         if (groupSet.filter && !isAdmin && isBotAdmin && !m.fromMe) {
            let toxic = setting.toxic
            if (body && (new RegExp('\\b' + toxic.join('\\b|\\b') + '\\b')).test(body.toLowerCase())) {
               groupSet.member[m.sender].warning += 1
               let warning = groupSet.member[m.sender].warning
               if (warning > 4) return client.reply(m.chat, Func.texted('bold', `🧸 Warning : [ 5 / 5 ], good bye ~~`), m).then(() => {
                  client.groupParticipantsUpdate(m.chat, [m.sender], 'remove').then(async () => {
                     groupSet.member[m.sender].warning = 0
                  })
               })
               return client.reply(m.chat, `🔥 *W A R N I N G* 🔥 \n\n Peringatan..!! : [ ${warning} / 5 ]\n\Jika Anda mendapatkan 5 peringatan, Anda akan ditendang secara otomatis dari grup.`, m)
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   group: true
}
