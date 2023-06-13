export default champions = {
    Aatrox : {
        basicStats : {
            Hp : 650,
            hpLvl : 114,
            AD : 60,
            ADLvl : 5,
            AS : 0.651,
            ASRatio : 0.651, 
            Armor : 38,
            ArmorLvl : 4.45,
            MR : 32,
            MRLvl : 2.05,
            MS : 345,
            Lifesteal : 0,
            Crit : 0,
            CritDmg : 175,
            HpRegen : 3,
            HpRegenLvl : 0.2,
            Mana : 0,
            ManaLvl : 0,
            AP : 0,
            Range : 175,
            ArmorPen : 0,
            ResistPen : 0,
            Haste : 0,
            SpellVamp : 0,
            ManaRegen : 0,
            ManaRegenLvl :0
        },
        img : {
            centered : 'Aatrox_0',
            passive : 'Aatrox_Passive',
            QSpell : 'AatroxQ',
            WSpell : 'AatroxW',
            ESpell : 'AatroxE',
            RSpell : 'AatroxR', 
        },
        spell : {
            Passive : {
                img : 'Aatrox_Passive',
                cd : [24,23.29,22.59,21.88,21.18,20.47,19.76,19.06,18.35,17.65,16.94,16.24,15.53,14.82,14.12,13.41,12.71,12],
                damage : 0,
                ratioAd : 0,
                ratioAp : 0,
            },
            Q : {
                img : 'AatroxQ',
                cd : [14,12,10,8,6],
                basicStats : [
                    {
                        damage : [10,30,50,70,90],
                        ratioAd : [60,65,70,75,80],
                        ratioAp : [0,0,0,0,0], 
                    },
                    {
                        damage : [12.5,37.5,62.5,85.5,112.5],
                        ratioAd : [75,81.25,87.5,93.75,100],
                        ratioAp : [0,0,0,0,0], 
                    },
                    {
                        damage : [15,45,75,105,135],
                        ratioAd : [90,97.5,105,112.5,120],
                        ratioAp : [0,0,0,0,0], 
                    },
                ],
                bonus : {
                    damage_crit : 60
                }
            },
            W : {
                img : 'AatroxW',
                cd : [20,18,16,14,12],
                basicStats : [
                    {
                        damage : [30,40,50,60,70],
                        ratioAd : [40,40,40,40,40],
                        ratioAp : [0,0,0,0,0], 
                    },
                    {
                        damage : [60,80,100,120,140],
                        ratioAd : [80,80,80,80,80],
                        ratioAp : [0,0,0,0,0], 
                    },
                ],
                bonus : {
                    damage_crit : 60
                }
            },
            E : {
                img : 'AatroxE',
                cd : [9,8,7,6,5],
                basicStats : [
                    {
                        damage : [0,0,0,0,0],
                        ratioAd : [0,0,0,0,0],
                        ratioAp : [0,0,0,0,0], 
                    }
                ],
            },
            R : {
                img : 'AatroxR',
                cd : [120,100,80],
                basicStats : [
                    {
                        damage : [0,0,0,0,0],
                        ratioAd : [0,0,0,0,0],
                        ratioAp : [0,0,0,0,0], 
                    }
                ],
                bonus : {
                    MS : [60,80,100],
                    AD : [20,32.5,45],
                    heal : [25,35,45]
                }
            },

        }
    },
    Ahri : {
        basicStats : {
            Hp : 590,
            hpLvl : 96,
            AD : 53,
            ADLvl : 3,
            AS : 0.668,
            ASRatio : 0.668, 
            Armor : 21,
            ArmorLvl : 4.7,
            MR : 30,
            MRLvl : 1.3,
            MS : 330,
            Lifesteal : 0,
            Crit : 0,
            CritDmg : 175,
            HpRegen : 2.5,
            HpRegenLvl : 0.12,
            Mana : 418,
            ManaLvl : 25,
            AP : 0,
            Range : 550,
            ArmorPen : 0,
            ResistPen : 0,
            Haste : 0,
            SpellVamp : 0,
            ManaRegen : 1.6,
            ManaRegenLvl : 0.16,
        },
        img : {
            centered : 'Ahri_0',
            passive : 'Ahri_SoulEater2',
            QSpell : 'AhriQ',
            WSpell : 'AhriW',
            ESpell : 'AhriE',
            RSpell : 'AhriR', 
        },
        spell : {
            Passive : {
                img : 'Ahri_SoulEater2',
                cd : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                damage : 0,
                ratioAd : 0,
                ratioAp : 0,
            },
            Q : {
                img : 'AhriQ',
                cd : [7,7,7,7,7],
                basicStats : [
                    {
                        damage : [40,65,90,115,140],
                        ratioAd : [0,0,0,0,0],
                        ratioAp : [45,45,45,45,45], 
                    },
                ],
            },
            W : {
                img : 'AhriW',
                cd : [9,8,7,6,5],
                basicStats : [
                    {
                        damage : [50,75,100,125,150],
                        ratioAd : [0,0,0,0,0],
                        ratioAp : [30,30,30,30,30], 
                    },
                ],
                bonus : {
                    MS : 40
                }
            },
            E : {
                img : 'AhriE',
                cd : [14,14,14,14,14],
                basicStats : [
                    {
                        damage : [80,110,140,170,200],
                        ratioAd : [0,0,0,0,0],
                        ratioAp : [60,60,60,60,60], 
                    },
                ],
            },
            R : {
                img : 'AhriR',
                cd : [130,105,80],
                basicStats : [
                    {
                        damage : [60,90,120],
                        ratioAd : [0,0,0],
                        ratioAp : [35,35,35], 
                    },
                ],
            },

        }
    },
    Akali : {
        basicStats : {
            Hp : 570,
            hpLvl : 119,
            AD : 62,
            ADLvl : 3.3,
            AS : 0.625,
            ASRatio : 0.625, 
            Armor : 23,
            ArmorLvl : 4.7,
            MR : 37,
            MRLvl : 2.05,
            MS : 345,
            Lifesteal : 0,
            Crit : 0,
            CritDmg : 175,
            HpRegen : 1.8,
            HpRegenLvl : 0.18,
            Mana : 200,
            ManaLvl : 0,
            AP : 0,
            Range : 125,
            ArmorPen : 0,
            ResistPen : 0,
            Haste : 0,
            SpellVamp : 0,
            ManaRegen : 10,
            ManaRegenLvl : 0,
        },
        img : {
            centered : 'Akali_0',
            passive : 'Akali_P',
            QSpell : 'AkaliQ',
            WSpell : 'AkaliW',
            ESpell : 'AkaliE',
            RSpell : 'AkaliR', 
        },
        spell : {
            Passive : {
                img : 'Akali_P',
                cd : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                damage : [35,38,41,44,47,50,53,62,71,80,89,98,107,122,137,152,167,182],
                ratioAd : 60,
                ratioAp : 55,
                bonus : {
                    MS : [30,30,30,30,30,40,40,40,40,40,50,50,50,50,50,60,60,60]
                }
            },
            Q : {
                img : 'AkaliQ',
                cd : [1.5,1.5,1.5,1.5,1.5],
                basicStats : [
                    {
                        damage : [40,65,90,115,140],
                        ratioAd : [65,65,65,65,65],
                        ratioAp : [60,60,60,60,60], 
                    },
                ],
            },
            W : {
                img : 'AkaliW',
                cd : [20,20,20,20,20],
                basicStats : [
                    {
                        damage : [0,0,0,0,0],
                        ratioAd : [0,0,0,0,0],
                        ratioAp : [0,0,0,0,0], 
                    },
                ],
                bonus : {
                    MS : [30,35,40,45,50]
                }
            },
            E : {
                img : 'AkaliE',
                cd : [16,14.5,13,11.5,10],
                basicStats : [
                    {
                        damage : [30,56.25,82.5,108.75,135],
                        ratioAd : [25.5,25.5,25.5,25.5,25.5],
                        ratioAp : [36,36,36,36,36], 
                    },
                    {
                        damage : [70,131.25,192.5,253.75,315],
                        ratioAd : [59.5,59.5,59.5,59.5,59.5],
                        ratioAp : [84,84,84,84,84], 
                    },
                ],
            },
            R : {
                img : 'AkaliR',
                cd : [100,80,60],
                basicStats : [
                    {
                        damage : [80,220,360],
                        ratioAd : [50,50,50],
                        ratioAp : [30,30,30], 
                    },
                ],
            },

        }
    },
    Akshan : {
        basicStats : {
            Hp : 630,
            hpLvl : 104,
            AD : 52,
            ADLvl : 3.5,
            AS : 0.638,
            ASRatio : 0.4, 
            Armor : 26,
            ArmorLvl : 4.2,
            MR : 30,
            MRLvl : 1.3,
            MS : 330,
            Lifesteal : 0,
            Crit : 0,
            CritDmg : 175,
            HpRegen : 1.8,
            HpRegenLvl : 0.18,
            Mana : 200,
            ManaLvl : 0,
            AP : 0,
            Range : 125,
            ArmorPen : 0,
            ResistPen : 0,
            Haste : 0,
            SpellVamp : 0,
            ManaRegen : 10,
            ManaRegenLvl : 0,
        },
        img : {
            centered : 'Akali_0',
            passive : 'Akali_P',
            QSpell : 'AkaliQ',
            WSpell : 'AkaliW',
            ESpell : 'AkaliE',
            RSpell : 'AkaliR', 
        },
        spell : {
            Passive : {
                img : 'Akali_P',
                cd : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                damage : [35,38,41,44,47,50,53,62,71,80,89,98,107,122,137,152,167,182],
                ratioAd : 60,
                ratioAp : 55,
                bonus : {
                    MS : [30,30,30,30,30,40,40,40,40,40,50,50,50,50,50,60,60,60]
                }
            },
            Q : {
                img : 'AkaliQ',
                cd : [1.5,1.5,1.5,1.5,1.5],
                basicStats : [
                    {
                        damage : [40,65,90,115,140],
                        ratioAd : [65,65,65,65,65],
                        ratioAp : [60,60,60,60,60], 
                    },
                ],
            },
            W : {
                img : 'AkaliW',
                cd : [20,20,20,20,20],
                basicStats : [
                    {
                        damage : [0,0,0,0,0],
                        ratioAd : [0,0,0,0,0],
                        ratioAp : [0,0,0,0,0], 
                    },
                ],
                bonus : {
                    MS : [30,35,40,45,50]
                }
            },
            E : {
                img : 'AkaliE',
                cd : [16,14.5,13,11.5,10],
                basicStats : [
                    {
                        damage : [30,56.25,82.5,108.75,135],
                        ratioAd : [25.5,25.5,25.5,25.5,25.5],
                        ratioAp : [36,36,36,36,36], 
                    },
                    {
                        damage : [70,131.25,192.5,253.75,315],
                        ratioAd : [59.5,59.5,59.5,59.5,59.5],
                        ratioAp : [84,84,84,84,84], 
                    },
                ],
            },
            R : {
                img : 'AkaliR',
                cd : [100,80,60],
                basicStats : [
                    {
                        damage : [80,220,360],
                        ratioAd : [50,50,50],
                        ratioAp : [30,30,30], 
                    },
                ],
            },

        }
    },
}