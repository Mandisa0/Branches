#python -m uvicorn main:app --reload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/initialise/branch")
def initialisebranch(branchFile, branchId):

    with open('../json/'+branchFile, 'r') as data:
        jsonData = json.load(data)

    branchIndex = 0
    branchIndexCount = 0
    for branch in jsonData['branches']:
        if str(branch['branch_id']) == branchId:
            branchIndex = branchIndexCount
        else:
            branchIndexCount += 1

    branchImage = jsonData['branchImage']
    nextBranchFile = jsonData['nextBranchFile']
    branchText = jsonData['branches'][branchIndex]['text']
    
    branchResponses = []
    for response in jsonData['branches'][branchIndex]['responses']:
        branchEffects = []
        if 'effects' in response:
            for key, effects in response['effects'].items():
                branchEffects.append({key: effects})
        branchResponses.append({'branchId': response['branch_id'], 'branchEffects': branchEffects,'response': response['response']})

    return {'branchImage': branchImage, 'nextBranchFile': nextBranchFile, 'branchText': branchText,  'branchResponses': branchResponses}