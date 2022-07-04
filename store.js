let store = [
    {
        name: "Battle Axe",
        photo: "./image/battleaxe.png",
        weaponMin: 5,
        weaponMax: 8,
        str: 5,
        dex: -2,
        int: 0,
        con: 0,
        armor: 0,
        cost: 100,
    },
    {
        name: "Sword and Shield",
        photo: "./image/swordshield.png",
        weaponMin: 2,
        weaponMax: 4,
        str: 2,
        dex: -1,
        int: 0,
        con: 3,
        armor: 3,
        cost: 100,
    },
    {
        name: "Massive Shield",
        photo: "./image/greatshield.png",
        weaponMin: 0,
        weaponMax: 1,
        str: 0,
        dex: -4,
        int: 0,
        con: 10,
        armor: 6,
        cost: 100,
    },
    {
        name: "Dagger",
        photo: "./image/dagger.png",
        weaponMin: 1,
        weaponMax: 3,
        str: 0,
        dex: 3,
        int: 0,
        con: -1,
        armor: 0,
        cost: 100,
    },
    {
        name: "Staff",
        photo: "./image/staff.png",
        weaponMin: 0,
        weaponMax: 1,
        str: -2,
        dex: 0,
        int: 5,
        con: 0,
        armor: 0,
        cost: 100,
    },
]

const buyItem = (num) => {
    if (character.gold < store[num].cost) {
        printMessage("Gold insuficiente","","")
    } else {
        let item = store.splice(num, 1)
        character.gold -= item[0].cost
        character.bag.push(item[0])
        printMessage("Você comprou " + item[0].name,"","")
        storeItems()
    }
}

const openItemTooltip = (location, i) => {
    let item = location
    document.getElementById("messageBox").style.display = "none"
    document.getElementById("scrollBox").style.display = "flex"
    document.getElementById("scrollBox").innerHTML = "<div>" + location[i].name + "</div><div id='itemImg'></div><div>Damage: " + location[i].weaponMin + " - " + location[i].weaponMax + "</div><div>Cons: " + location[i].con + " | Str: " + location[i].str + " | Dex: " + location[i].dex + " | Int: " + location[i].int + "</div><div>Armor: " + location[i].armor + "</div><div>Price: " + location[i].cost + "</div>"
    document.getElementById("itemImg").style.backgroundImage = "url('" + location[i].photo + "')"
}

const closeItemTooltip = (i) => {
    document.getElementById("scrollBox").innerHTML = ""
    document.getElementById("messageBox").style.display = "flex"
    document.getElementById("scrollBox").style.display = "none"
}

