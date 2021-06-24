import json
import os
import ujson

filename = 'data.geojson'
with open(filename, 'r') as f:
    data = json.load(f)
    # data['id'] = 134 # <--- add `id` value.
    newData = {'type': data['type'], 'features': []}
    for x in data['features']:
        if "STATE" in x['properties']:
            print('The key is present.')
            newProperties = {'NAME': x['properties']['NAME'], 'ISO_A3': 'USA'}
            newObj = {'type': x['type'], 'properties': newProperties, 'geometry': x['geometry']}
            newData['features'].append(newObj)
        else:
            print('The key does not exist in the dictionary.')
            newProperties = {'NAME': x['properties']['NAME'], 'ISO_A3': x['properties']['ISO_A3']}
            newObj = {'type': x['type'], 'properties': newProperties, 'geometry': x['geometry']}
            newData['features'].append(newObj)

        #try:
        #    getattr(x['properties'], 'STATE')
        #    print('exists try')
            #print(x['properties']['STATE'])
            #newData['features'].append(x)
        #except AttributeError:
        #    print('doesnt exist')
        #    newData['features'].append(x)
        #else:
        #    print('exists')

        #try:
        #    print(x.properties['STATE'])
        #    newData['features'].append(x)
        #except AttributeError:
        #    newObj = {'type': x.type}
        #    newData['features'].append(newObj)

#os.remove(filename)
with open('data-new.min.geojson', 'w') as f:
    json.dump(newData, f, separators=(',', ':'))