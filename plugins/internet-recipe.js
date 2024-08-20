import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

    if (command == 'food') {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} burger`
    try {
let f = await fetch(`https://api.spoonacular.com/food/menuItems/search?apiKey=da321822ad4040d1addcb3237db2aeba&query=${text}`)
let xx = await f.json()
let str = xx.menuItems.map((v, index) => {
        return `*${htki} ${1 + index} ${htka}*\n*title:* ${v.title}
*id:* ${v.id}
*image:* ${v.image}
*restaurantChain:* ${v.restaurantChain}
*servings:* ${v.servings.number}
`.trim()
    }).join('\n\n')
            conn.sendFile(m.chat, xx.menuItems[0].image, 'food.png', str, m)
            } catch {
            throw eror
            }
    }
   
  if (command == 'ingredients') {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} sugar`
    try {
let f = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=da321822ad4040d1addcb3237db2aeba&ingredients=${text}`)
let xx = await f.json()
let str = xx.map((v, index) => {
        return `*${htki} ${1 + index} ${htka}*\n*title:* ${v.title}
*id:* ${v.id}
*image:* ${v.image}
*usedIngredientCount:* ${v.usedIngredientCount}
*missedIngredientCount:* ${v.missedIngredientCount}

*missedIngredients*
*id:* ${v.missedIngredients[0].id}
*amount:* ${v.missedIngredients[0].amount}
*unit:* ${v.missedIngredients[0].unit}
*aisle:* ${v.missedIngredients[0].aisle}
*name:* ${v.missedIngredients[0].name}
*original:* ${v.missedIngredients[0].original}
`.trim()
    }).join('\n\n')
            conn.sendFile(m.chat, xx[0].image, 'food.jpg', str, m)
            } catch {
            throw eror
            }
    }
    
    if (command == 'recipes') {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} 1003464`
    try {
let f = await fetch(`https://api.spoonacular.com/recipes/${text}/ingredientWidget.json?apiKey=da321822ad4040d1addcb3237db2aeba`)
let xx = await f.json()
let str = xx.ingredients.map((v, index) => {
        return `*${htki} ${1 + index} ${htka}*\n*name:* ${v.name}
*metric value:* ${v.amount.metric.value}
*metric unit:* ${v.amount.metric.unit}
*us value:* ${v.amount.us.value}
*us unit:* ${v.amount.us.unit}
*image: https://spoonacular.com/cdn/ingredients_100x100/${v.image}
`.trim()
    }).join('\n\n')
            conn.sendFile(m.chat, `https://spoonacular.com/cdn/ingredients_100x100/${xx.ingredients[0].image}`, 'food.jpg', str, m)
            } catch {
            throw eror
            }
    }

}

handler.help = ['food', 'ingredients', 'recipes'].map(v => v + ' <apa>')
handler.command = ['food', 'ingredients', 'recipes']
handler.tags = ['internet']

export default handler
