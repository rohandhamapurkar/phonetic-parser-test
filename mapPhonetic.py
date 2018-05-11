from metaphone import doublemetaphone
import json
i = 0;

entries = dict()
send = list()
for i in range(161):
    f = open('./nveg/{}.json'.format(i)).read()
    print(i)
    data = json.loads(f)
    for k in data:
        arr = list()
        for j in data[k]:
            if(len(arr)<191):
                if(doublemetaphone(j)[0] == doublemetaphone(k)[0]):
                    arr.append(str(j))
            else:
                break;
        dit = dict()
        dit["value"] = str(k)
        dit["synonyms"] = arr
        print(arr)
    send.append(dit)
with open('nveg.json', 'w') as outfile:
    json.dump(send, outfile)