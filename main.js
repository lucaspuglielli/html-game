let character 
let mainTarget
let equipedWeapon

const createCharacter = () => {
    let name = prompt("Qual seu nome?")
    let hp = 100
    let mp = 100
    let armor = 0
    let dodge = 30
    let weaponMin = 0
    let weaponMax = 3
    let str = 1
    let dex = 1
    let int = 1
    let con = 1
    let lvl = 1
    let exp = 0
    let pts = 5
    let gold = 100
    let bag = []
    return {
        name,
        hp,
        mp,
        armor,
        dodge,
        weaponMin,
        weaponMax,
        str,
        dex,
        int,
        con,
        lvl,
        exp,
        pts,
        gold,
        bag
    }
}

const createTarget = (num) => {
    // let name = "Boss"
    // let lvl = 1 + (character.lvl-1)
    // let con = 2 + (character.lvl-1)
    // let str = 2 + (character.lvl-1)
    // let dex = 2 + (character.lvl-1)
    // let hp = 100+((con-1)*10)
    // let mp = 100
    // let armor = 0
    // let dodge = 30+((dex-1)*5)
    // let weaponMin = 0
    // let weaponMax = 3
    // let int = 1
    // let exp = Math.floor(120 * (1.1 ** (lvl-1)))
    // let gold = Math.floor(30 * (1.1 ** (lvl-1)))
    let target = targetSelect(num)
    document.getElementById("targetImg").style.backgroundImage = "url('" + target.photo + "')"
    document.getElementById("subContainer2").style.display = "block"
    return {
        name:target.name,
        hp:100+((target.con-1)*10),
        mp:100+((target.int-1)*10),
        armor:target.armor,
        dodge:30+((target.dex-1)*5),
        weaponMin:target.weaponMin,
        weaponMax:target.weaponMax,
        str:target.str,
        dex:target.dex,
        int:target.int,
        con:target.con,
        lvl:target.lvl,
        gold:target.gold,
        exp:target.exp
    }
}

const showButtons = (buttom) => {
    document.getElementById("subButtonBox1").style.display = "none"
    document.getElementById("subButtonBox2").style.display = "none"
    document.getElementById("subButtonBox3").style.display = "none"
    document.getElementById("subButtonBox4").style.display = "none"
    document.getElementById("subButtonBox5").style.display = "none"
    document.getElementById("subButtonBox6").style.display = "none"
    if (buttom != undefined) {
        document.getElementById(buttom).style.display = "block"
    }
}

const newCharacter = () => {
    character = createCharacter()
    if (character.name.length > 1 && character.name[0] != " ") {
        mainTarget = {}
        document.getElementById("newCharacter").style.display = "none"
        showButtons("subButtonBox4")
        document.getElementById("subContainer1").style.display = "block"
        document.getElementById("subContainer2").style.display = "none"
        let progressBar = document.getElementById("progressBar")
        progressBar.style.width = (100*character.exp/Math.floor(100 * (1.4 ** (character.lvl-1)))) + "%"
        printMessage("Você possui " + character.pts + " pontos para distribuir.", "", "")
        updateAll()
    } else {
        character = {}
        document.getElementById("subContainer1").style.display = "none"
        document.getElementById("subContainer2").style.display = "none"
        showButtons()
        document.getElementById("newCharacter").style.display = "block"
    }
}

const newTarget = (num) => {
    if(character.hp > 0) {
        mainTarget = createTarget(num)
        showButtons("subButtonBox2")
        updateTarget()
    }
}

const upStr = () => {
    if (character.hp > 0) {
        if (character.pts >= 1) {
            character.str += 1
            character.pts -= 1
            printMessage("Você ganhou 1 nivel em Força.", character.pts + " pontos restantes.", "")
            if (character.pts == 0) {
                showButtons("subButtonBox1")
            }
        }
        else {
            printMessage("Pontos insuficientes.", character.pts + " pontos restantes.", "")
            showButtons("subButtonBox1")
        }
        updatePlayer()
    }
}
const upDex = () => {
    if (character.hp > 0) {
        if (character.pts >= 1) {
            character.dex += 1
            character.pts -= 1
            character.dodge = 30+((character.dex-1)*5)
            printMessage("Você ganhou 1 nivel em Destreza.", character.pts + " pontos restantes.", "")
            if (character.pts == 0) {
                showButtons("subButtonBox1")
            }
        }
        else {
            printMessage("Pontos insuficientes.", character.pts + " pontos restantes.", "")
            showButtons("subButtonBox1")
        }
        updatePlayer()
    }
}
const upInt = () => {
    if (character.hp > 0) {
        if (character.pts >= 1) {
            character.int += 1
            character.pts -= 1
            character.mp += ((character.int-1)*10)
            printMessage("Você ganhou 1 nivel em Inteligência.", character.pts + " pontos restantes.", "")
            if (character.pts == 0) {
                showButtons("subButtonBox1")
            }
        }
        else {
            printMessage("Pontos insuficientes.", character.pts + " pontos restantes.", "")
            showButtons("subButtonBox1")
        }
        updatePlayer()
    }
}
const upCon = () => {
    if (character.hp > 0) {
        if (character.pts >= 1) {
            character.con += 1
            character.pts -= 1
            character.hp += ((character.con-1)*10)
            printMessage("Você ganhou 1 nivel em Constituição.", character.pts + " pontos restantes.", "")
            if (character.pts == 0) {
                showButtons("subButtonBox1")
            }
        }
        else {
            printMessage("Pontos insuficientes.", character.pts + " pontos restantes.", "")
            showButtons("subButtonBox1")
        }
        updatePlayer()
    } 
}

const rest = () => {
    if (character.hp > 0) {
        character.hp = 100+((character.con-1)*10)
        character.mp = 100+((character.int-1)*10)
        character.dodge = 30+((character.dex-1)*5)
        printMessage("Você está descansado.", "", "")
        updatePlayer()
    }
}

const bagItems = () => {
    document.getElementById("subButtonBox5").innerHTML = ""
    for (i = 0; i < character.bag.length; i++) {
        document.getElementById("subButtonBox5").innerHTML += '<button onmouseover="openItemTooltip(character.bag,' + i + ')" onmouseout="closeItemTooltip()" onclick="equipItem(' + i + ')">' + character.bag[i].name + '</button>'
    }
    document.getElementById("subButtonBox5").innerHTML += '<button onclick="closeBag()">Back</button>'
}

const storeItems = () => {
    document.getElementById("subButtonBox6").innerHTML = ""
    for (i = 0; i < store.length; i++) {
        document.getElementById("subButtonBox6").innerHTML += '<button onmouseover="openItemTooltip(store,' + i + ')" onmouseout="closeItemTooltip()" onclick="buyItem(' + i + ')">' + store[i].name + '</button>'
    }
    document.getElementById("subButtonBox6").innerHTML += '<button onclick="closeStore()">Back</button>'
}

const openStore = () => {
    showButtons("subButtonBox6")
    document.getElementById("messageBox").style.display = "none"
    document.getElementById("scrollBox").style.display = "flex"
    storeItems()
}

const closeStore = () => {
    showButtons("subButtonBox1")
    document.getElementById("messageBox").style.display = "flex"
    document.getElementById("scrollBox").innerHTML = ""
    document.getElementById("scrollBox").style.display = "none"
}

const openBag = () => {
    showButtons("subButtonBox5")
    document.getElementById("messageBox").style.display = "none"
    document.getElementById("scrollBox").style.display = "flex"
    bagItems()
}

const equipItem = (num) => {
    if (equipedWeapon != undefined) {
        character.weaponMin -= equipedWeapon.weaponMin
        character.weaponMax -= equipedWeapon.weaponMax
        character.str -= equipedWeapon.str
        character.dex -= equipedWeapon.dex
        character.dodge -= (equipedWeapon.dex*5)
        character.int -= equipedWeapon.int
        character.mp -= (equipedWeapon.int*10)
        character.con -= equipedWeapon.con
        character.hp -= (equipedWeapon.con*10)
        character.armor -= equipedWeapon.armor
    }
    let newWeapon = character.bag[num]
    character.weaponMin += newWeapon.weaponMin
    character.weaponMax += newWeapon.weaponMax
    character.str += newWeapon.str
    character.dex += newWeapon.dex
    character.dodge += (newWeapon.dex*5)
    character.int += newWeapon.int
    character.mp += (newWeapon.int*10)
    character.con += newWeapon.con
    character.hp += (newWeapon.con*10)
    character.armor += newWeapon.armor
    equipedWeapon = newWeapon
    printMessage("Você equipou: " + equipedWeapon.name,"","")
    updatePlayer()
}

const closeBag = () => {
    showButtons("subButtonBox1")
    document.getElementById("messageBox").style.display = "flex"
    document.getElementById("scrollBox").innerHTML = ""
    document.getElementById("scrollBox").style.display = "none"
}

const playerAtk = () => {
    if(character.hp > 0) {
        if (mainTarget.hp > 0) {
            let hit = (Math.floor(Math.random() * 101)+(character.dex-1)*5)
            if (hit >= mainTarget.dodge) {
                let damagePre = (Math.floor(Math.random() * (character.str+1)) + character.weaponMin + Math.floor(Math.random() * (character.weaponMax-character.weaponMin+1)))
                let damagePos
                if (damagePre > mainTarget.armor) {
                    damagePos = (damagePre - mainTarget.armor)
                } else {
                    damagePos = 0 
                }
                mainTarget.hp -= damagePos
                if (mainTarget.hp <= 0) {
                    // character.exp += mainTarget.exp
                    character.gold += mainTarget.gold
                    printMessage("Você causou " + damagePos + " de dano.", "O alvo está morto.", "Você ganhou " + mainTarget.exp + " de exp e " + mainTarget.gold + " de gold.")
                    document.getElementById("subContainer2").style.display = "none"
                    showButtons("subButtonBox1")
                    upExp(mainTarget.exp)
                } else {
                    printMessage("Você causou " + damagePos + " de dano.", "", "")
                    showButtons("subButtonBox3")
                }
            }
            else {
                printMessage("Você errou o ataque.", "", "")
                showButtons("subButtonBox3")
            }
        }
    }
    updateAll()
}

const targetAtk = () => {
    if(mainTarget.hp > 0) {
        if (character.hp > 0) {
            let hit = (Math.floor(Math.random() * 101)+(mainTarget.dex-1)*5)
            if (hit >= character.dodge) {
                let damagePre = (Math.floor(Math.random() * (mainTarget.str+1)) + mainTarget.weaponMin + Math.floor(Math.random() * (mainTarget.weaponMax-mainTarget.weaponMin+1)))
                let damagePos
                if (damagePre > character.armor) {
                    damagePos = (damagePre - character.armor)
                } else {
                    damagePos = 0 
                }
                character.hp -= damagePos
                if (character.hp <= 0) {
                    document.getElementById("subContainer1").style.display = "none"
                    document.getElementById("newCharacter").style.display = "block"
                    showButtons()
                    printMessage("Seu alvo causou " + damagePos + " de dano em você.", "Você morreu.", "")
                } else {
                    printMessage("Seu alvo causou " + damagePos + " de dano em você.", "", "")
                    showButtons("subButtonBox2")
                }
            }
            else {
                printMessage("Seu alvo errou o ataque.", "", "")
                showButtons("subButtonBox2")
            }
        }
    }
    updateAll()
}

const printMessage = (message, message2, message3) => {
    document.getElementById("messageBox").style.display = "flex"
    document.getElementById("scrollBox").style.display = "none"
    document.getElementById("message").innerHTML = message;
    document.getElementById("message2").innerHTML = message2;
    document.getElementById("message3").innerHTML = message3;
}

// const showStore = () => {
//     document.getElementById("messageBox").style.display = "none"
//     document.getElementById("scrollBox").style.display = "flex"
//     document.getElementById("subButtonBox6").innerHTML = ""
//     for (i = 0; i < character.bag.length; i++) {
//         document.getElementById("subButtonBox6").innerHTML += '<button onclick="equipItem(' + i + ')">' + character.bag[i].name + '</button>'
//     }
//     document.getElementById("subButtonBox6").innerHTML += '<button onclick="closeBag()">Back</button>'
// }

const updatePlayer = () => {
    document.getElementById("playerName").innerHTML = character.name
    document.getElementById("playerLvl").innerHTML = character.lvl
    document.getElementById("playerGold").innerHTML = character.gold
    document.getElementById("playerHp").innerHTML = (character.hp + " / " + (100 + ((character.con-1)*10)))
    document.getElementById("playerMp").innerHTML = (character.mp + " / " + (100 + ((character.int-1)*10)))
    document.getElementById("playerArmor").innerHTML = character.armor
    document.getElementById("playerDodge").innerHTML = character.dodge
    document.getElementById("playerDamage").innerHTML = character.weaponMin + " - " + character.weaponMax
    document.getElementById("playerStr").innerHTML = character.str
    document.getElementById("playerDex").innerHTML = character.dex
    document.getElementById("playerInt").innerHTML = character.int
    document.getElementById("playerCon").innerHTML = character.con
}

const updateTarget = () => {
    document.getElementById("targetName").innerHTML = mainTarget.name
    document.getElementById("targetLvl").innerHTML = mainTarget.lvl
    document.getElementById("targetHp").innerHTML = (mainTarget.hp + " / " + (100 + ((mainTarget.con-1)*10)))
    document.getElementById("targetMp").innerHTML = (mainTarget.mp + " / " + (100 + ((mainTarget.int-1)*10)))
    document.getElementById("targetArmor").innerHTML = mainTarget.armor
    document.getElementById("targetDodge").innerHTML = mainTarget.dodge
    document.getElementById("targetDamage").innerHTML = mainTarget.weaponMin + " - " + mainTarget.weaponMax
    document.getElementById("targetStr").innerHTML = mainTarget.str
    document.getElementById("targetDex").innerHTML = mainTarget.dex
    document.getElementById("targetInt").innerHTML = mainTarget.int
    document.getElementById("targetCon").innerHTML = mainTarget.con
}

const updateAll = () => {
    updatePlayer()
    updateTarget()
}

const upExp = (exp) => {
    let lvlExp = Math.floor(100 * (1.4 ** (character.lvl-1)))
    if ((character.exp+exp) >= lvlExp){
        character.exp = (character.exp+exp) - lvlExp
        character.lvl += 1
        character.pts += 3
        lvlExp = Math.floor(100 * (1.4 ** (character.lvl-1)))
        if ((character.exp) >= lvlExp){
            while ((character.exp) >= lvlExp) {
                character.exp = character.exp - lvlExp
                character.lvl += 1
                character.pts += 3
                lvlExp = Math.floor(100 * (1.4 ** (character.lvl-1)))
            }
        }
        printMessage("LEVEL UP!","Você ganhou " + exp + " de exp e " + mainTarget.gold + " de gold.", "Você possui " + character.pts + " pontos para distribuir.")
        showButtons("subButtonBox4")
    } else {
        character.exp += exp
    }
    let progressBar = document.getElementById("progressBar")
    progressBar.style.width = (100*character.exp/Math.floor(100 * (1.4 ** (character.lvl-1)))) + "%"
    updatePlayer()
}
