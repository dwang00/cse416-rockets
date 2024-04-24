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

def drop_unecessary_columns(file):
    cols_to_drop = ["UR20", "FUNCSTAT20", "AGE_18_19", "AGE_20_24", "AGE_25_29", "AGE_30_34", "AGE_35_44", "AGE_45_54",
                    "AGE_55_64", "AGE_65_74", "AGE_75_84", "AGE_85OVER"]
    file.drop(columns=cols_to_drop, inplace=True)


def get_al_statistics():
    file_path = 'AL precinct shape.zip'
    all_stats = pd.read_csv(file_path)
    
    # keep only house data
    filtered_columns = [col for col in all_stats.columns if 'GSL' in col]

    # Extract the 'Name' column from the original DataFrame and create a new DataFrame
    stats = pd.DataFrame(all_stats['UNIQUE_ID'])
    
    # merge columns

    return stats

"""def create_al_file():
    al_prec = gpd.read_file('AL precinct shape.zip')
    # for some reason the shape file only loads in the congress data despite the csv from the same dataset
    #      having everything.......
    # we have manually add in the rows and remove the useless ones.
    keep = ['UNIQUE_ID', 'geometry']
    al_prec.drop(columns=[col for col in al_prec.columns if col not in keep], inplace=True)

    al_prec_stats = get_al_statistics()
    al_prec = pd.merge(al_prec, al_prec_stats, on="UNIQUE_ID")

    write_as_geojson(al_prec, 'al_prec')

    return al_prec"""


if __name__ == '__main__':
    # create_al_file()
    # get_al_statistics()

    """al = gpd.read_file('AL_sldl.zip')
    print(al.columns)
    al.plot(cmap="tab20")
    plt.show()
    
    al2 = gpd.read_file('AL_sldl.zip')
    print(al2.columns)
    al2.plot(cmap="tab20")
    plt.show()"""
    de = gpd.read_file('DE_precincts.geojson')
    #print(de.columns)
    #de.drop('geometry')
    group_de = de.groupby("DISTRICT")
    summed_black_pop = group_de['ETH1_AA'].sum()/group_de['TOTAL_REG'].sum()
    print(summed_black_pop)
