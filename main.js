let character 
let mainTarget
let day

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
        pts
    }
}

const createTarget = () => {
    let name = "Boss"
    let lvl = 1 + (character.lvl-1)
    let con = 2 + (character.lvl-1)
    let str = 2 + (character.lvl-1)
    let dex = 2 + (character.lvl-1)
    let hp = 100+((con-1)*10)
    let mp = 100
    let armor = 0
    let dodge = 30+((dex-1)*5)
    let weaponMin = 0
    let weaponMax = 3
    let int = 1
    let exp = Math.floor(120 * (1.1 ** (lvl-1)))
    let gold = Math.floor(30 * (1.1 ** (lvl-1)))
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
        gold,
        exp
    }
}

// const resetProgress = () => {
    
// }

const newCharacter = () => {
    character = createCharacter()
    let progressBar = document.getElementById("progressBar")
    progressBar.style.width = (100*character.exp/Math.floor(100 * (1.4 ** (character.lvl-1)))) + "%"
    printMessage("", "", "")
    updatePlayer()
    // resetProgress()
}

const newTarget = () => {
    mainTarget = createTarget()
    updateTarget()
}

const upStr = () => {
    if (character.pts >= 1) {
        character.str += 1
        character.pts -= 1
        printMessage("Você ganhou 1 nivel em Força.", character.pts + " pontos restantes.", "")
    }
    else {
        printMessage("Pontos insuficientes.", character.pts + " pontos restantes.", "")
    }
    updatePlayer()
}
const upDex = () => {
    if (character.pts >= 1) {
        character.dex += 1
        character.pts -= 1
        character.dodge = 30+((character.dex-1)*5)
        printMessage("Você ganhou 1 nivel em Destreza.", character.pts + " pontos restantes.", "")
    }
    else {
        printMessage("Pontos insuficientes.", character.pts + " pontos restantes.", "")
    }
    updatePlayer()
}
const upInt = () => {
    if (character.pts >= 1) {
        character.int += 1
        character.pts -= 1
        character.mp = 100+((character.int-1)*10)
        printMessage("Você ganhou 1 nivel em Inteligência.", character.pts + " pontos restantes.", "")
    }
    else {
        printMessage("Pontos insuficientes.", character.pts + " pontos restantes.", "")
    }
    updatePlayer()
}
const upCon = () => {
    if (character.pts >= 1) {
        character.con += 1
        character.pts -= 1
        character.hp = 100+((character.con-1)*10)
        printMessage("Você ganhou 1 nivel em Constituição.", character.pts + " pontos restantes.", "")
    }
    else {
        printMessage("Pontos insuficientes.", character.pts + " pontos restantes.", "")
    }
    updatePlayer()
}

const rest = () => {
    character.hp = 100+((character.con-1)*10)
    character.mp = 100+((character.int-1)*10)
    character.dodge = 30+((character.dex-1)*5)
    // day.time = 1
    printMessage("Você está descansado.", "", "")
    updatePlayer()
}

const playerAtk = () => {
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
                printMessage("Você causou " + damagePos + " de dano.", "O alvo está morto.", "Você ganhou " + mainTarget.exp + " de exp.")
                upExp(mainTarget.exp)
            } else {
                printMessage("Você causou " + damagePos + " de dano.", "", "")
            }
        }
        else {
            printMessage("Você errou o ataque.", "", "")
        }
    } else {
        printMessage("O alvo já está morto, continuar batendo não terá efeito.", "", "")
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
                    printMessage("Seu alvo causou " + damagePos + " de dano em você.", "Você morreu.", "")
                } else {
                    printMessage("Seu alvo causou " + damagePos + " de dano em você.", "", "")
                }
            }
            else {
                printMessage("Seu alvo errou o ataque.", "", "")
            }
        } else {
            printMessage("Você morreu.", "", "")
        }
    } else {
        printMessage("Seu alvo está morto.", "", "")
    }
    updateAll()
}

const printMessage = (message, message2, message3) => {
    document.getElementById("message").innerHTML = message;
    document.getElementById("message2").innerHTML = message2;
    document.getElementById("message3").innerHTML = message3;
}

const updatePlayer = () => {
    document.getElementById("playerName").innerHTML = character.name
    document.getElementById("playerLvl").innerHTML = character.lvl
    document.getElementById("playerHp").innerHTML = (character.hp + " / " + (100 + ((character.con-1)*10)))
    document.getElementById("playerMp").innerHTML = (character.mp + " / " + (100 + ((character.int-1)*10)))
    document.getElementById("playerArmor").innerHTML = character.armor
    document.getElementById("playerDodge").innerHTML = character.dodge
    document.getElementById("playerWeaponMin").innerHTML = character.weaponMin
    document.getElementById("playerWeaponMax").innerHTML = character.weaponMax
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
    document.getElementById("targetWeaponMin").innerHTML = mainTarget.weaponMin
    document.getElementById("targetWeaponMax").innerHTML = mainTarget.weaponMax
    document.getElementById("targetStr").innerHTML = mainTarget.str
    document.getElementById("targetDex").innerHTML = mainTarget.dex
    document.getElementById("targetInt").innerHTML = mainTarget.int
    document.getElementById("targetCon").innerHTML = mainTarget.con
    // document.getElementById("targetExp").innerHTML = mainTarget.exp
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
        printMessage("LEVEL UP!","Você ganhou " + exp + " de exp.", "Você possui " + character.pts + " pontos para distribuir.")
    } else {
        character.exp += exp
    }

    let progressBar = document.getElementById("progressBar")
    progressBar.style.width = (100*character.exp/Math.floor(100 * (1.4 ** (character.lvl-1)))) + "%"
    updatePlayer()
}