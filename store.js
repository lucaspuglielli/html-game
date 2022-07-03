let storeItems = [
    {
        name: "Battle Axe",
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
    if (character.gold < storeItems[num].cost) {
        printMessage("Gold insuficiente","","")
    } else {
        let item = storeItems.splice(num, 1)
        console.log(item[0])
        character.gold -= item[0].cost
        character.bag.push(item[0])
        printMessage("Você comprou " + item[0].name,"","")
    }
}
