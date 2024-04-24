# CSE 416 Rockets
# Jachao Lee

import pandas as pd
import geopandas as gpd
import numpy as np
import json
import requests
import pymongo


def grab():
    al_lower = gpd.read_file('al_sldl_2021.zip')
    de_lower = gpd.read_file('de_sldl_adopted_2022.zip')

    al_lower['area_density'] = al_lower['POPULATION'] / al_lower['AREA']
    de_lower['area_density'] = de_lower['ADJ_POPULA'] / de_lower['AREA']

    # white density relative
    al_lower['white_density'] = al_lower['WHITE'] / al_lower['POPULATION']
    de_lower['white_density'] = de_lower['ADJ_WHITE'] / de_lower['ADJ_POPULA']

    # black density relative
    al_lower['black_density'] = al_lower['BLACK'] / al_lower['POPULATION']
    de_lower['black_density'] = de_lower['ADJ_BLACK'] / de_lower['ADJ_POPULA']

    summations = {}
    summations['al_ttl_black'] = sum(al_lower['BLACK'])
    summations['de_ttl_black'] = sum(de_lower['ADJ_BLACK'])
    summations['al_ttl_white'] = sum(al_lower['WHITE'])
    summations['de_ttl_white'] = sum(de_lower['ADJ_WHITE'])
    summations['al_ttl_asian'] = sum(al_lower['ASIAN'])
    summations['de_ttl_asian'] = sum(de_lower['ADJ_ASIAN'])
    summations['al_ttl_pop'] = sum(al_lower['POPULATION'])
    summations['de_ttl_pop'] = sum(de_lower['ADJ_POPULA'])
    # summations['al_white_gt_black'] = al_lower['WHITE'] > al_lower['BLACK']
    # summations['de_white_gt_black'] = de_lower['WHITE'] > de_lower['BLACK']

    #al_lower_strings = {str(key): value for key, value in al_lower.to_dict()}
    #de_lower_strings = {str(key): value for key, value in de_lower.to_dict().items()}
    #summations_strings = {str(key): value for key, value in summations.items()}
    print(type(json.loads(al_lower.to_json())))
    al_and_de = [json.loads(al_lower.to_json()),
                 json.loads(de_lower.to_json()),
                 json.loads(json.dumps(summations))
                 ]
    # Return GeoJSON data as JSON response
    return al_and_de

def insert_to_mongodb(data):
    try:
        client = pymongo.MongoClient('mongodb://localhost:27017/')
        db = client['cse416-rockets']
        collection = db['geojson']
        collection.insert_many(data)
        print("Inserted successfully into mongodb")
    except Exception as e:
        print(f'Failed to insert: {e}')



if __name__ == '__main__':
    data = grab()
    insert_to_mongodb(data)

