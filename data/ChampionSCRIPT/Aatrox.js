import React from "react";

export default class Aatrox {
    constructor(basicStats){
        this.setBasicStats(basicStats)
    }

    getBasicStats() {
        return this.basicStats
    }

    setBasicStats(newStats){
        this.basicStats = newStats
    }

    getImage(){
        return {
            "centered": "Aatrox_0",
            "passive": "Aatrox_Passive",
            "QSpell": "AatroxQ",
            "WSpell": "AatroxW",
            "ESpell": "AatroxE",
            "RSpell": "AatroxR"
          }
    }

    upgradeStatsForLvl(level){
        this.basicStats.Hp = this.basicStats.Hp + this.basicStats.hpLvl * (level - 1)
        this.basicStats.AD = this.basicStats.AD + this.basicStats.AD * (level - 1)
        this.basicStats.AS = this.basicStats.AS * (1 + (this.basicStats.ASRatio* (level - 1))/100)
        this.basicStats.Armor = this.basicStats.Armor + this.ArmorLvl * (level - 1)
        this.basicStats.MR = this.basicStats.MR + this.MRLvl * (level - 1)
        this.basicStats.HpRegen = this.basicStats.HpRegen + this.HpRegenLvl * (level - 1)
        this.basicStats.Mana = this.basicStats.Mana + this.ManaLvl * (level - 1)
        this.basicStats.ManaRegen = this.basicStats.ManaRegen + this.ManaRegenLvl * (level - 1)
    }

    getPassiveDamage(){
        return 0
    }

    getPassiveCD(level){
        return 24 - 12 / 17 * (level -1)
    }

    getQCD(spellLevel){
        let cd = [14,12,10,8,6]
        return cd[spellLevel - 1]
    }

    getQDamage(spellLevel, bonus){
        let bonus_stats = bonus ? 1.6 : 1
        let basicDmg = [
            37.5,
            112.5,
            187.5,
            262.5,
            337.5
        ]

        let ratioAd = [
            225,
            243.75,
            262.5,
            281.25,
            300
          ]

        return (basicDmg[spellLevel - 1] + ((ratioAd[spellLevel - 1] * this.basicStats.AD) / 100)) * bonus_stats
        
    }

    getWCD(spellLevel){
        let cd = [20,18,16,14,12]
        return cd[spellLevel - 1]
    }
    getWDamage(spellLevel){
        let basicDmg = [
            60,
            80,
            100,
            120,
            140
        ]

        return basicDmg[spellLevel - 1] + (80 * this.basicStats.AD / 100)
    }

    getECD(spellLevel) {
        let cd = [9,8,7,6,5]
        return cd[spellLevel - 1]
    }

    getEHeal(spellLevel){
        let basicDmg = [  
            18,
            19.5,
            21,
            22.5,
            24
        ]
        return basicDmg[spellLevel - 1]
    }

    getRCD(spellLevel){
        let cd = [120,100,80]
        return cd[spellLevel - 1]
    }

    setBonusR(spellLevel){
        let bonusMS = [60,80,100]
        let bonusAD = [20,32.5,45]

        this.basicStats.MS = this.basicStats.MS  + (bonusMS[spellLevel - 1] * this.basicStats.MS /100 )
        this.basicStats.AD = this.basicStats.AD  + (bonusAD[spellLevel - 1] * this.basicStats.AD /100 )  
    }

    getSpellData(spellLevel){
        let spell = {
            P : {
                damage : this.getPassiveDamage(),
                cd : this.getPassiveCD(),
                _ : 0
            },
            Q : {
                damage : this.getQDamage(),
                cd : this.getQCD(),
                _ : 0
            },
            W : {
                damage : this.getWDamage(),
                cd : this.getWCD(),
                _ : 0
            },
            E : {
                damage : 0,
                cd : this.getECD(),
                heal : this.getEHeal(),
                _ : 0
            },
            R : {
                damage : 0,
                cd : this.getRCD(),
                _ : 0
            },
        }
    }
}