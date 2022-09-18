exports.run = {
   usage: ['ban', 'unban'],
   async: async (m, {
      client,
      text,
      command,
      participants
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return client.reply(m.chat, Func.texted('bold', `🧸 Mention or Reply chat target.`), m)
      if (isNaN(number)) return client.reply(m.chat, Func.texted('bold', `🧸 Invalid number.`), m)
      if (number.length > 15) return client.reply(m.chat, Func.texted('bold', `🧸 Invalid format.`), m)
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         let is_user = global.db.users
         let is_owner = [global.client.user.id.split`@` [0], global.owner, ...global.db.setting.owners].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(user)
         if (typeof is_user[user] == 'undefined') return client.reply(m.chat, Func.texted('bold', `🧸 User data not found.`), m)
         if (command == 'ban') {
            if (is_owner) return client.reply(m.chat, Func.texted('bold', `🧸 Can't banned owner number.`), m)
            if (user == client.user.id) return client.reply(m.chat, Func.texted('bold', `🧸 ??.`), m)
            if (is_user[user].banned) return client.reply(m.chat, Func.texted('bold', `🧸 Target already banned.`), m)
            is_user[user].banned = true
            let banned = 0
            for (let jid in is_user) {
               if (is_user[jid].banned) banned++
            }
            client.reply(m.chat, `❏ *B A N N E D* ❏\n\n*“Successfully added @${user.split`@`[0]} into banned list.”*\n\n*Total : ${banned}*`, m)
         } else if (command == 'unban') {
            if (!is_user[user].banned) return client.reply(m.chat, Func.texted('bold', `🧸 Target not banned.`), m)
            is_user[user].banned = false
            let banned = 0
            for (let jid in is_user) {
               if (is_user[jid].banned) banned++
            }
            client.reply(m.chat, `❏ *U N B A N N E D* ❏\n\n*“Succesfully removing @${user.split`@`[0]} from banned list.”*\n\n*Total : ${banned}*`, m)
         }
      }
   },
   owner: true,
   cache: true,
   location: __filename
}
