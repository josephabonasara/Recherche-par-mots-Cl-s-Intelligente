import os, json
def getjson(keyword,website):
    filename = 'data.json'
    with open(filename, 'r') as f:
        data = json.load(f)
       # data.append((str(keyword),str(website))) # tupleeee
        data[str(keyword)]=str(website)
    os.remove(filename)
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)
