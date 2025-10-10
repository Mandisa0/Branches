import json

with open('branches.json', 'r') as data:
    jsonData = json.load(data)

def initialisebranch(branch_id):

    branchIndex = 0
    branchIndexCount = 0
    for branch in jsonData['branches']:
        if str(branch['branch_id']) == branch_id:
            branchIndex = branchIndexCount
        else:
            branchIndexCount += 1

    print(jsonData['branches'][branchIndex]['text'])
    for response in jsonData['branches'][branchIndex]['responses']:
        print('('+str(response['branch_id'])+'): '+response['response'])


while 1 == 1:
    selected_option = input('enter option: ')
    initialisebranch(selected_option)