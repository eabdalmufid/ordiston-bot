let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    if (!text) throw 'Input text required';
    const [query, caption] = text.split(/[^\w\s]/g);
    if (!query || !caption) throw 'Input query and caption required\n*Example:* ' + usedPrefix + command + ' 5160xxxxxxxxxxxx';
    try {
        const result = await GenerateCC(query, parseInt(caption))
        await m.reply(result);
    } catch (e) {
        await m.reply('Error occurred');
    }
}
handler.help = ['ccgen'].map(v => v + ' (query)')
handler.tags = ['generator']
handler.command = /^(ccgen)$/i
handler.limit = true
export default handler

function GenerateCC(CCPN, CCTOT = 10) {
    const datax = {
        querySelector: {
            '#output2': {
                value: ''
            },
            '#date': {
                textContent: new Date().getFullYear()
            }
        },
        getElementById: {
            'ccpN': {
                value: CCPN
            },
            'ccghm': {
                value: CCTOT
            },
            'ccoudatfmt': {
                value: 'json'
            },
            'ccnsp': {
                value: 1
            },
            'ccexpdat': {
                value: true
            },
            'emeses': {
                value: 'rnd'
            },
            'eyear': {
                value: 'rnd'
            },
            'eccv': {
                value: 'rnd'
            },
            'ccvi': {
                value: true
            },
            'ccbank': {
                value: true
            },
        }
    }

    function fillter() {
        const bin = datax.getElementById['ccpN'].value
        let maxInputCC
        const ccBrand = chkCard(bin)
        switch (ccBrand) {
            case 'American Express':
                maxInputCC = 15
                break
            case 'Diners Club':
                maxInputCC = 14
                break
            default:
                maxInputCC = 16
                break
        }
        const getUserBin = bin.padEnd(maxInputCC, 'x')
        return getUserBin
    }
    const rnd = (frN, toN) => Math.floor(Math.random() * (toN - frN + 1)) + frN
    const unilenS = (aS, ul, fc = '0', p = 0) => {
        let rS = '' + aS
        ul = Number.parseFloat(ul)
        if (!fc || !p) {
            fc = '0'
            p = 0
        }
        const rL = rS.length
        if (rL < ul) {
            rS = p === 0 ? fc.repeat(ul - rL) + rS : rS + fc.repeat(ul - rL)
        }
        return rS
    }

    function darkside(p1, tr) {
        tr = tr || 1
        const ccghm = Math.min(Math.max(parseInt(datax.getElementById['ccghm'].value), 1), 100)
        let out = ''
        if (p1) {
            const selectedOption = datax.getElementById['ccoudatfmt'].value
            const formatPrefix = (selectedOption.value === 'xml') ? '<xml>\n' : (selectedOption.value === 'json') ? '{\n' : ''
            let clcd, ccck, cdi
            for (let k = 1; k <= ccghm; k++) {
                const p = p1
                const cn = chkCard(p1)
                clcd = false
                ccck = false
                cdi = ''
                for (let i = tr; i >= 1; i--) {
                    cdi = sbtStringSpRnd(p, 'x', '0123456789')
                    const cf = sbtString(cdi, ' -/abcdefghijklmnopqrstuvwyzABCDEFGHIJLMNOPQRSTUVWYZ')
                    clcd = chkLCD(cf)
                    ccck = chkCCCksum(cf, cn)
                    if (clcd && ccck) break
                }
                if (clcd && ccck) {
                    const j = datax.getElementById['ccnsp']
                    const ccnspc = (j === 1) ? ' ' : (j === 2) ? '-' : ''
                    let cdif = ''
                    for (let i = 0; i < cdi.length; i++) {
                        const aS = (cdi[i] === ' ') ? ccnspc : cdi[i]
                        cdif += aS
                    }
                    let expDate = ''
                    if (datax.getElementById['ccexpdat'].value) {
                        const dnowi = new Date()
                        const mes = (datax.getElementById['emeses'].value === 'rnd') ? unilenS(rnd(1, 12), 2, '0', 0) : datax.getElementById['emeses'].value
                        const year = (datax.getElementById['eyear'].value === 'rnd') ? (dnowi.getFullYear() + rnd(2, 6)) : datax.getElementById['eyear'].value
                        expDate = `|${mes}|${year}`
                    }
                    const eccv = (datax.getElementById['eccv'].value === 'rnd' && datax.getElementById['ccvi'].value) ?
                        ((cdif.startsWith('34') || cdif.startsWith('37')) ?
                            (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000) :
                            (Math.floor(Math.random() * (998 - 112 + 1)) + 112)) :
                        datax.getElementById['eccv'].value
                    out += `${formatPrefix}${cdif}${expDate}${(datax.getElementById['ccvi'].value) ? ('|' + eccv) : ''}${(datax.getElementById['ccbank'].value) ? ('|' + cn) : ''}\n`
                } else {
                    out = 'Error'
                    break
                }
            }
            return out
        }
    }

    function chkCard(cdi) {
        const brands = [{
                pattern: /^4/,
                name: 'Visa'
            },
            {
                pattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01])/i,
                name: 'Mastercard'
            },
            {
                pattern: /^(6011|65|64[4-9]|622)/,
                name: 'Discover'
            },
            {
                pattern: /^(34|37)/,
                name: 'American Express'
            },
            {
                pattern: /^(30[0-5]|309|36|38|39)/,
                name: 'Diners Club'
            },
            {
                pattern: /^35(2[89]|[3-8][0-9])/,
                name: 'JCB'
            }
        ]
        cdi = sbtString(cdi, ' -/abcdefghijklmnopqrstuvwyzABCDEFGHIJLMNOPQRSTUVWYZ')
        for (let i = 0; i < brands.length; i++) {
            if (cdi.match(brands[i].pattern)) {
                return brands[i].name
            }
        }
        return 'Unknown'
    }

    function chkCCCksum(cf, cn) {
        const w = [2, 1]
        let ml = 0
        let j = 0
        for (let i = cf.length - 2; i >= 0; i--) {
            const m = parseInt(cf[i], 10) * w[j % w.length]
            ml += Math.floor(m / 10) + (m % 10)
            j++
        }
        const ml2 = 10 - (ml % 10)
        const ml1 = (10 - ((ml + ml2) % 10)) % 10
        return parseInt(cf[cf.length - 1], 10) === ml1
    }

    function chkLCD(cf) {
        cf = sbtString(cf, '0123456789')
        let ctd = 0
        for (let i = cf.length - 1; i >= 0; i--) {
            let cdg = parseInt(cf[i], 10)
            if ((cf.length - i) % 2 === 0) {
                cdg *= 2
                if (cdg > 9) {
                    cdg -= 9
                }
            }
            ctd += cdg
        }
        return (ctd % 10) === 0
    }

    function sbtString(s1, s2) {
        let ous = ''
        for (let i = 0; i < s1.length; i++) {
            const c1 = s1.charAt(i)
            const c2 = s2.indexOf(c1)
            if (c2 === -1) ous += c1
        }
        return ous
    }

    function sbtStringSpRnd(s1, s2, bS = '0123456789') {
        let ous = ''
        for (let i = 0; i < s1.length; i++) {
            const c1 = s1.charAt(i)
            const c2 = s2.indexOf(c1)
            if (c2 === -1) ous += c1
            else ous += bS.charAt(Math.floor(Math.random() * bS.length))
        }
        return ous
    }

    const tr = 100
    const binInputUsr = datax.getElementById['ccpN'].value
    const output = darkside(binInputUsr, tr)
    return output;
}