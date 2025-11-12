### Example Usage

#### get/branches
https://phantomstudio.co.za/branches/get/branches

##### sample response:

{  
  "branches": {  
    "branches": [  
      {  
        "description": "",  
        "file": "necromancer/necromancer_01.json",  
        "title": "The Necromancer"  
      },  
      {  
        "description": "",  
        "file": "cursed_crown/cursed_crown_01.json",  
        "title": "The Cursed Crown"  
      }  
    ]  
  }  
}  

#### initialise/branch
https://phantomstudio.co.za/branches/initialise/branch?branchFile=necromancer/necromancer_01.json&branchId=1

##### sample response:

{  
    "branchImage": "../images/necromancer/necromancer_01.png",  
    "branchResponses": [  
        {  
            "branchEffects": [  
                {  
                    "energy": -5  
                }  
            ],  
            "branchId": 2,  
            "response": "Approach quietly, hand on sword hilt"  
        },  
        {  
            "branchEffects": [  
                {  
                    "strength": 5  
                },  
                {  
                    "energy": -10  
                }  
            ],  
            "branchId": 3,  
            "response": "Shout and demand they stop at once"  
        },  
        {  
            "branchEffects": [  
                {  
                    "energy": -3  
                }  
            ],  
            "branchId": 4,  
            "response": "Throw a rock to distract them"  
        }  
    ],  
    "branchText": "The streets are quiet tonight, save for the echo of your boots. A faint green glow leaks from an alley - and with it, the whisper of forbidden words. Someone\"s practicing necromancy. As a city guard, that\"s your problem now.",  
    "nextBranchFile": "necromancer/necromancer_02.json"  
}