#python -m uvicorn main:app --reload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from markupsafe import escape

app = Flask(__name__)
application = app

CORS(app)

@app.get("/get/branches")
def getBranches():

    with open('branches/branches.json', 'r') as data:
        jsonData = json.load(data)

    return jsonData

@app.get("/initialise/branch")
def initialiseBranch():

    branchFile = request.args.get('branchFile')
    branchId = request.args.get('branchId')

    with open('branches/'+branchFile, 'r') as data:
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

    return jsonify({'branchImage': branchImage, 'nextBranchFile': nextBranchFile, 'branchText': branchText,  'branchResponses': branchResponses})

if __name__ == '__main__':
    app.run(debug=True)