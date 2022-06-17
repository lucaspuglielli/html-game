const targetSelect = (num) => {
    let character = {
        0 : {
            name: "Demon Knight",
            photo: "./image/zsolt-kosa-lich-knight-prezi.jpg",
            armor: 0,
            weaponMin: 0,
            weaponMax: 3,
            str: 3,
            dex: 1,
            int: 1,
            con: 2,
            lvl: 1,
            gold: 45,
            exp: 150,
        },
        1 : {
            name: "Skeleton Archer",
            photo: "./image/15b2a91d8b7e0e4c1b1f531dd85eb841.jpg",
            armor: 0,
            weaponMin: 0,
            weaponMax: 3,
            str: 1,
            dex: 2,
            int: 1,
            con: 1,
            lvl: 1,
            gold: 25,
            exp: 110,
        },
        2 : {
            name: "Lich",
            photo: "./image/michele-esposito-michele-esposito-ss.jpg",
            armor: 0,
            weaponMin: 0,
            weaponMax: 3,
            str: 1,
            dex: 1,
            int: 4,
            con: 1,
            lvl: 1,
            gold: 35,
            exp: 135,
        }
    }
    return character[num]
}