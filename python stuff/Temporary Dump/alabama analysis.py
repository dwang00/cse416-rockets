import maup as maup
import numpy as np
import pandas as pd
import geopandas as gpd
import matplotlib

matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import random

random.seed(42)


def write_as_geojson(file_to_write, file_name):
    # change coordinate system
    file_to_write['geometry'] = file_to_write.geometry.to_crs("epsg:3857")

    geojson_data = file_to_write.to_json()
    output_file_path = f"{file_name}.geojson"
    with open(output_file_path, 'w') as file:
        file.write(geojson_data)
    return file_to_write


if __name__ == '__main__':
    al_prec = gpd.read_file('al_gen_22_prec.zip')
    # for some reason the shape file only loads in the congress data despite the csv from the same dataset
    #      having everything.......
    # we have manually add in the rows and remove the useless ones.
    keep = ['UNIQUE_ID', 'geometry']
    al_prec.drop(columns=[col for col in al_prec.columns if col not in keep], inplace=True)
    write_as_geojson(al_prec, 'al_prec')
