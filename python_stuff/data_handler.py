# CSE 416 Rockets
# Jachao Lee

import pandas as pd
import geopandas as gpd
import numpy as np
import json

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


@app.route('/get_geojson')
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
    summations['al_ttl_pop'] = sum(al_lower['POPULATION'])
    summations['de_ttl_pop'] = sum(de_lower['ADJ_POPULA'])

    al_and_de = {"al": al_lower.to_json(), "de": de_lower.to_json(), "sums": json.dumps(summations)}
    # Return GeoJSON data as JSON response
    return jsonify(al_and_de)


if __name__ == '__main__':
    app.run(debug=True, port=3021)