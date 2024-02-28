# CSE 416 Rockets
# Jachao Lee

import pandas as pd
import geopandas as gpd
import json

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route('/get_geojson')
def grab():
    al_lower = gpd.read_file('al_sldl_2021.zip')
    de_lower = gpd.read_file('de_sldl_adopted_2022.zip')
    
    al_and_de = {"al":al_lower.to_json(), "de":de_lower.to_json()}
    # Return GeoJSON data as JSON response
    return jsonify(al_and_de)


if __name__ == '__main__':
    app.run(debug=True, port=3021)