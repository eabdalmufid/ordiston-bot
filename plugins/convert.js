let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = usedPrefix + command + " cf|40"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    let urut = text.split`|`
    let one = urut[0]
    let two = urut[1]
    let mula = await Calculate(one, two)
    throw mula
}
handler.tags = ["tools"]
handler.command = handler.help = ["convert"]
export default handler

    function Calculate(type, val){
	if (type == 'cf') {
		return {
			"First": "C° - Celsius",
			"Second": "F° - Fahrenheit",
			"Result": ((val / 5 * 9) + 32).toFixed(3),
			"Form": "(C / 5 * 9) + 32"
		}
	} else if (type == 'fc') {
		return {
			"First": "F° - Fahrenheit",
			"Second": "C° - Celsius",
			"Result": (5 * (val - 32) / 9).toFixed(3),
			"Form": "5 * (F - 32) / 9"
		}
	} else if (type == 'ck') {
		return {
			"First": "C° - Celsius",
			"Second": "K° - Kelvin",
			"Result": val + 273.15,
			"Form": "C + 273,15"
		}
	} else if (type == 'kc') {
		return {
			"First": "K° - Kelvin",
			"Second": "C° - Celsius",
			"Result": val - 273.15,
			"Form": "K - 273,15"
		}
	} else if (type == 'rc') {
		return {
			"First": "R° - Rankine",
			"Second": "C° - Celsius",
			"Result": ((val - 491.67) * 5 / 9).toFixed(3),
			"Form": "(R − 491,67) * 5 / 9"
		}
	} else if (type == 'cr') {
		return {
			"First": "C° - Celsius",
			"Second": "R° - Rankine",
			"Result": (val * 9 / 5 + 491.67).toFixed(2),
			"Form": "C * 9 / 5 + 491,67"
		}
	} else if (type == 'rf') {
		return {
			"First": "R° - Rankine",
			"Second": "F° - Fahrenheit",
			"Result": val - 459.67,
			"Form": "R - 459,67"
		}
	} else if (type == 'fr') {
		return {
			"First": "F° - Fahrenheit",
			"Second": "R° - Rankine",
			"Result": val + 459.67,
			"Form": "F + 459,67"
		}
	} else if (type == 'fk') {
		return {
			"First": "F° - Fahrenheit",
			"Second": "K° - Kelvin",
			"Result": ((val - 32) * 5/9 + 273.15).toFixed(3),
			"Form": "(F − 32) * 5/9 + 273,15"
		}
	} else if (type == 'kf') {
		return {
			"First": "K° - Kelvin",
			"Second": "F° - Fahrenheit",
			"Result": ((val - 273.15) * 9 / 5 + 32).toFixed(3),
			"Form": "(K - 273,15) * 9 / 5 + 32"
		}
	} else if (type == 'km') {
		return {
			"First": "KM - Kilometer",
			"Second": "MI - Miles",
			"Result": val * 0.621379,
			"Form": "KM * 0.621379"
		}
	} else if (type == 'mk') {
		return {
			"First": "MI - Miles",
			"Second": "KM - Kilometer",
			"Result": val / 0.62137,
			"Form": "MI / 0.62137"
		}
	} else if (type == 'tg') {
		return {
			"First": "T - Ton",
			"Second": "G - Gram",
			"Result": val * 1000000,
			"Form": "T * 1000000"
		}
	} else if (type == 'gk') {
		return {
			"First": "G - Gram",
			"Second": "KG - Kilogram",
			"Result": val / 1000,
			"Form": "G / 1000"
		}
	} else if (type == 'kg') {
		return {
			"First": "KG - Kilogram",
			"Second": "G - Gram",
			"Result": val * 1000,
			"Form": "KG * 1000"
		}
	} else if (type == 'gt') {
		return {
			"First": "G - Gram",
			"Second": "T - Tons",
			"Result": val / 1e+6,
			"Form": "G / 1000000"
		}
	} else if (type == 'kgt') {
		return {
			"First": "KG - Kilogram",
			"Second": "T - Tons",
			"Result": val / 1000,
			"Form": "KG / 1000"
		}
	} else if (type == 'gmg') {
		return {
			"First": "G - Gram",
			"Second": "MG - Miligram",
			"Result": val / 1000,
			"Form": "G / 1000"
		}
	} else if (type == 'tmg') {
		return {
			"First": "T - Ton",
			"Second": "MG - Miligram",
			"Result": val * 1e+9,
			"Form": "T * 1000000000"
		}
	} else if (type == 'tkg') {
		return {
			"First": "T - Ton",
			"Second": "KG - Kilogram",
			"Result": val * 1000,
			"Form": "T * 1000"
		}
	} else if (type == 'mgt') {
		return {
			"First": "MG - Miligram",
			"Second": "T - Ton",
			"Result": val / 1e9,
			"Form": "MG / 1000000000"
		}
	} else if (type == 'kgmg') {
		return {
			"First": "KG - Kilogram",
			"Second": "MG - Miligram",
			"Result": val * 1e6,
			"Form": "KG * 1000000"
		}
	} else if (type == 'mgg') {
		return {
			"First": "MG - Miligram",
			"Second": "G - Gram",
			"Result": val / 1000,
			"Form": "MG / 1000"
		}
	} else if (type == 'mgkg') {
		return {
			"First": "MG - Miligram",
			"Second": "KG - Kilogram",
			"Result": val / 1000000,
			"Form": "MG / 1000000"
		}
	} else return false
	
}