import maup as maup
import numpy as np
import pandas as pd
import geopandas as gpd
import matplotlib

matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import random

random.seed(42)


def add_districts(census_block, district, debug=False):
    cen = census_block['geometry']
    dst = district['geometry']
    print(district.columns)
    print()
    print(census_block.columns)

    # This should add CONGDIST
    districts = []
    for index, cen_row in enumerate(cen):  # Iterate through each row in cen
        # is contained and the area contained is more than half 
        # (we will assign every census block to majority district)
        filtered_df = dst.apply(lambda row: cen_row.intersection(row).area >= cen_row.area * .5)
        filtered_indices = district[filtered_df]

        if debug:
            print(filtered_indices.columns)
            print(f"Values found: {filtered_indices.shape}")
            print(f"Census Block Size: {cen_row.area * .5}")
            print(f"Intersection(0) Area: {cen_row.intersection(filtered_indices['geometry'].iloc[0]).area}")
            print(f"District: {filtered_indices['DISTRICT']}")
            print(f"District: {filtered_indices['DISTRICT'].iloc[0]}", end="\n\n\n")

        if not filtered_indices.empty:
            districts.append(filtered_indices["DISTRICT"].iloc[0])
        else:
            census_block.drop(index)
    census_block['DISTRICT'] = districts


def drop_unecessary_columns(file):
    cols_to_drop = ["UR20", "FUNCSTAT20", "AGE_18_19", "AGE_20_24", "AGE_25_29", "AGE_30_34", "AGE_35_44", "AGE_45_54",
                    "AGE_55_64", "AGE_65_74", "AGE_75_84", "AGE_85OVER"]
    file.drop(columns=cols_to_drop, inplace=True)


def write_as_geojson(file_to_write, file_name):
    # change coordinate system
    file_to_write['geometry'] = file_to_write.geometry.to_crs("epsg:3857")
    

    geojson_data = file_to_write.to_json()
    output_file_path = f"{file_name}.geojson"
    with open(output_file_path, 'w') as file:
        file.write(geojson_data)
    return file_to_write


def create_al_file(debug=False):
    al_block = gpd.read_file('al census shape.zip')
    al_block.drop(columns=['UACE20'], inplace=True)  # data in UACE20 has yet to be assigned as of 2024

    file_path = 'AL_l2_2022stats_2020block.zip'
    block_stats = census_block_stats(file_path)
    block_stats = block_stats.iloc[61:]
    block_stats = block_stats.iloc[:-4] # no assignments

    de_block = pd.merge(al_block, block_stats, on="GEOID20")

    de_district = gpd.read_file('al_sldl.zip')

    # preprocessing
    add_districts(de_block, de_district, False)
    drop_unecessary_columns(de_block)

    created_file = write_as_geojson(de_block, 'AL_census')

    if debug:
        de_block.plot(column="DISTRICT", cmap="tab20")
        de_district.plot(cmap="tab20")
        plt.show()

    return created_file


def create_de_file(debug=False):
    de_block = gpd.read_file('de census shape.zip')
    de_block.drop(columns=['UACE20'], inplace=True)  # data in UACE20 has yet to be assigned as of 2024

    file_path = 'DE_2022stats.csv'
    block_stats = census_block_stats(file_path)
    block_stats = block_stats.iloc[:-3]  # last 3 rows are administrative errors (no census block,

    de_block = pd.merge(de_block, block_stats, on="GEOID20")

    de_district = gpd.read_file('de_sldl.zip')

    # preprocessing
    add_districts(de_block, de_district, False)
    drop_unecessary_columns(de_block)

    created_file = write_as_geojson(de_block, 'DE_census')

    if debug:
        de_block.plot(column="DISTRICT", cmap="tab20")
        de_district.plot(cmap="tab20")
        plt.show()

    return created_file


def census_block_stats(file_path):
    primary = list(range(31))
    # read only first 31 rows
    census_block_stats = pd.read_csv(file_path, usecols=primary, dtype={"geoid20": "string"})

    census_block_stats.columns = census_block_stats.columns.map(str.upper)

    # combine columns
    census_block_stats['PARTY_OTHER'] = census_block_stats['TOTAL_REG'] - (census_block_stats['PARTY_REP'] +
                                                                           census_block_stats['PARTY_DEM'])

    # drop columns that were merged
    cols_to_drop = list(census_block_stats.columns[17:25])  # parties that are not republican or democratic
    census_block_stats.drop(columns=cols_to_drop, inplace=True)
    
    return census_block_stats


def census_block_party_percents(df):
    ttl = df['PARTY_REP'] + df['PARTY_DEM'] + df['PARTY_OTHER']
    df['PARTY_DEM_PER'] = df['PARTY_DEM'] / ttl
    df['PARTY_REP_PER'] = df['PARTY_REP'] / ttl


def get_de_by_precinct_csv():
    import requests
    from bs4 import BeautifulSoup
    import csv

    # Read the HTML content from the text file
    with open('delaware_website_html.txt', 'r') as file:
        html_content = file.read()
    soup = BeautifulSoup(html_content, 'html.parser')

    div = soup.find('div', {'id': 'byelectiondist'})

    if not div:
        print("NOT FOUND. ABORT.")
        return

    # Create a CSV file and write the table data into it
    with open('de_precincts.csv', 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        column_names = ['PRECINCT', 'CANDIDATE', 'PARTY', 'VOTES', 'PERCENTAGE']
        desired_columns = [0, 1, 5, 6]
        csv_writer.writerow(column_names)

        all_precinct_datas = div.find_all('table')

        for i, data in enumerate(all_precinct_datas):
            rows = data.find_all('tr')
            precinct = data.find_previous_sibling('h4').get_text(strip=True)

            for row in rows[1:]: # skip first row, its headers
                row_data = [cell.get_text(strip=True) for cell in row.find_all('td')]
                filtered_row_data = [row_data[i] for i in desired_columns]
                data = [precinct] + filtered_row_data
                csv_writer.writerow(data)

            if not i%50:
                print(f'iteration: {i}')
    
    print("Done writing")


def de_precinct_data_from_block():
    de_prec = gpd.read_file('de precinct shape.zip')
    de_blocks = gpd.read_file('DE_census.geojson')
    de_prec['geometry'] = de_prec.geometry.to_crs("epsg:3857")
    variables = ["TOTAL_REG", "ETH1_EUR", "ETH1_HISP", "ETH1_AA", "ETH1_ESA", "ETH1_UNK",
                 "VOTERS_GENDER_M", "VOTERS_GENDER_F", "VOTERS_GENDER_UNKNOWN", 
                 "PARTY_DEM", "PARTY_REP", "PARTY_OTHER"]
    blocks_to_precincts_assignment = maup.assign(de_blocks, de_prec)
    de_prec[variables] = de_blocks[variables].groupby(blocks_to_precincts_assignment).sum()
    write_as_geojson(de_prec, "DE_precincts")


if __name__ == '__main__':
    blocks = create_de_file()
    # get_de_by_precinct_csv()
    # de_precinct_data_from_block()
    # create_al_file()

    print("done")
