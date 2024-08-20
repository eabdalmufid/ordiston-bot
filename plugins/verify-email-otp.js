import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, text, usedPrefix }) => {
let imgr = flaaa

    conn.regmail = conn.regmail ? conn.regmail : {}
    let id = m.chat
    if (id in conn.regmail) {
        conn.reply(m.chat, '*❗ Selesaikan registrasi email ini terlebih dahulu!*', conn.regmail[id][0])
        throw false
    }
    
    if (!text) throw `*Example*: ${usedPrefix}${command} email@gmail.com`
  let email = text.trim().split(/\s+\|\s+/).shift()
  let message = text.trim().split(/\s+\|\s+/).pop()
  if (!isValidEmail(email)) throw `Example: ${usedPrefix + command} email`
  
    let generateOTP = (Math.floor(Math.random() * 9000) + 1000).toString()
    let avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')
    let res = await sendEmail(namebot, nameown, nomorown, nomorbot, m.name, message, generateOTP, conn.user.jid.split("@")[0], avatar, email)

    let json = {
        jawaban: generateOTP,
        soal: "Reply pesan ini dan masukkan kode OTP yang dikirim ke email"
    }
    if (res.success == true) {
  let caption = `*${command.toUpperCase()}*
${json.soal} ${email}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hotp untuk menampilkan OTP
    `.trim()
    let mesOtp = await conn.sendFile(m.chat, imgr + command, '', caption, m)
    conn.regmail[id] = [
        mesOtp,
        json, poin,
        setTimeout(() => {
            if (conn.regmail[id]) conn.reply(m.chat, `*❌ Kode verifikasi Anda telah kedaluwarsa.*\nOTP *${json.jawaban}*`, conn.regmail[id][0])
            conn.sendMessage(m.chat, { delete: mesOtp.key })
            delete conn.regmail[id]
        }, timeout)
    ]
    }
}
handler.help = ['regmail']
handler.tags = ['game']
handler.command = /^regmail/i

export default handler

const buttons = [
    ['Hint', '/hotp'],
    ['Nyerah', 'menyerah']
]

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function getLocationInfo() {
  try {
    const response = await fetch('https://ipinfo.io/json');
    if (!response.ok) throw new Error(`Failed to fetch data. Status: ${response.status}`);
    const data = await response.json();
    return Object.values(data).join(', ');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function sendEmail(botName, ownName, botNumber, ownNumber, Name, Msg, OTP, Number, PP, Mail) {
let html = `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>${botName} - otp-email;</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title>
          Confirm your email address
        </title>
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          #outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }
        </style>
        <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        
        
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
    </style>
    
  
        <style type="text/css">
        
        

    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile { width: 100% !important; }
      td.mj-full-width-mobile { width: auto !important; }
    }
  
        </style>
        <style type="text/css">@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,700');.card {
      box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.08);
      }

      .text-link {
      color: #0f72ee;
      }

      .link {
      color: #0f72ee;
      }


      .token-ele {
      width: 225px;
      font-size: 36px;
      letter-spacing: 14px;
      }

      .button > table {
      width: 275px;
      }

      @media (max-width: 425px) {
      .token-ele {
      font-size: 24px;
      letter-spacing: 8px;
      width: 200px;
      text-align: left;
      }

      .button > table {
      width: 200px;
      }
      }.footer-link {
        color: #0f72ee;
      }</style>
        
      </head>
      <body style="word-spacing:normal;background-color:#f7f9fb
;">
        
    <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
      Confirm your email address using this OTP
    </div>
  
        
      <div style="background-color:#f7f9fb
;">
        <!-- this ensures Gmail doesn't trim the email --><span style="opacity: 0"> ${Msg} </span>
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-top:48px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:122px;">
              
      <img style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 10px; background-color: #e5e5e5; background-image: url('${PP}'); background-size: cover; background-position: center;"/>
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
      
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:588px;" width="588" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="margin:0px auto;max-width:588px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:48px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="card-outlook" width="588px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="card-outlook" style="width:588px;" width="588" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div class="card" style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:588px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
          <tbody>
            <tr>
              <td style="border-top:5px solid #0f72ee;direction:ltr;font-size:0px;padding:20px 0;padding-bottom:48px;padding-left:15px;padding-right:15px;padding-top:40px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:558px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                  
      <div style="font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#2b292d;"><h1 style="margin-bottom: 16px; line-height: 36px; margin-bottom: 0px; ">Activate your account</h1></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:10px 25px;padding-top:12px;word-break:break-word;">
                  
      <div style="font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:normal;line-height:24px;text-align:left;color:#616161;">Please use the OTP below to access ${botName}.</div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" class="token" style="font-size:0px;padding:10px 25px;padding-top:24px;word-break:break-word;">
                  
      <div style="font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:36px;font-weight:bold;letter-spacing:14px;line-height:24px;text-align:left;color:#2b292d;" id="token"><mj-raw>
              <div class="token-ele" style=" background-color: #e0e6ef; padding-top: 20px; padding-bottom: 20px; padding-left: 24px;  padding-right: 24px;   border-radius: 4px;" id="token">
                ${OTP}
              </div>
            </mj-raw></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:10px 25px;padding-top:12px;word-break:break-word;">
                  
      <div style="font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:normal;line-height:24px;text-align:left;color:#616161;">Alternatively, click the button below to verify your login.</div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" vertical-align="middle" class="button" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tbody>
          <tr>
            <td align="center" bgcolor="#0f72ee" role="presentation" style="border:none;border-radius:3px;cursor:auto;height:42px;mso-padding-alt:10px 25px;background:#0f72ee;" valign="middle">
              <a href="https://wa.me/${Number}?text=${OTP}" style="display:inline-block;background:#0f72ee;color:white;font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank">
                Verify account login
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-top:24px;word-break:break-word;">
                  
      <p style="border-top:dashed 1px #e4ebf6;font-size:1px;margin:0px auto;width:100%;">
      </p>
      
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:dashed 1px #e4ebf6;font-size:1px;margin:0px auto;width:508px;" role="presentation" width="508px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
    
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:10px 25px;padding-top:24px;word-break:break-word;">
                  
      <div style="font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:normal;line-height:24px;text-align:left;color:#616161;">If “Verify account login” button is not working, copy and paste this link in your
            browser to verify <a href="https://wa.me/${Number}?text=${OTP}" target="_blank" class="link" rel="noreferrer">https://wa.me/${Number}?text=${OTP}</a></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-top:24px;word-break:break-word;">
                  
      <p style="border-top:dashed 1px #e4ebf6;font-size:1px;margin:0px auto;width:100%;">
      </p>
      
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:dashed 1px #e4ebf6;font-size:1px;margin:0px auto;width:508px;" role="presentation" width="508px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
    
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:10px 25px;padding-top:48px;padding-bottom:8px;word-break:break-word;">
                  
      <div style="font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:700;line-height:24px;text-align:left;color:#000000;">Need Help?</div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:10px 25px;padding-top:4px;padding-bottom:0px;word-break:break-word;">
                  
      <div style="font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:24px;text-align:left;color:#616161;">Please send a feedback or bug info
            to <a href="https://wa.me/${ownNumber}?text=feedback" class="link"> ${ownName} </a></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><![endif]-->
    
    
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td>
              
        
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:588px;" width="588" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
        
      <div style="margin:0px auto;max-width:588px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="588px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:588px;" width="588" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="margin:0px auto;max-width:588px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:588px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td style="vertical-align:top;padding:0;">
              
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                  
      <div style="font-family:'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:400;line-height:24px;text-align:center;color:#445566;">${await getLocationInfo()}
            <br/>
            Thanks!
            <br/></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
            </td>
          </tr>
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
        
      <!--[if mso | IE]></td></tr></table><![endif]-->
    
      
            </td>
          </tr>
        </tbody>
      </table>
    <!-- this ensures Gmail doesn't trim the email --><span style="opacity: 0"> ${Msg} </span>
      </div>
    
      </body>
    </html>
<!-- partial -->
  
</body>
</html>
`
    try {
        return await fetch("https://send.api.mailtrap.io/api/send/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 46fae2154055e6df3901c95919531b2a",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "from": {
                        "email": "notifier@boyne.dev",
                        "name": "📩 Activation by " + botName
                    },
                    "to": [{
                        "email": Mail,
                        "name": "📩 Activation by " + botName
                    }],
                    "subject": "🌟 Hello " + Name,
                    "html": html,
                    "category": "Notification"
                })
            })
            .then(response => response.json())
    } catch (error) {
        console.error("Request failed:", error)
        throw error
    }
}
async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}