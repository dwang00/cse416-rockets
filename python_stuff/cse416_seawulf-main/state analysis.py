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


def census_block_stats(file_path):
    primary = list(range(31))
    # read only first 31 rows
    """
    primary = ['geoid20','total_reg','age_18_19','age_20_24','age_25_29',
                'age_30_34','age_35_44','age_45_54','age_55_64','age_65_74',
                'age_75_84','age_85over','voters_gender_m','voters_gender_f',
                'voters_gender_unknown','party_rep','party_dem','eth1_eur',
                'eth1_hisp','eth1_aa','eth1_esa','eth1_oth','eth1_unk']
    """
    # Not completed, read specific columns by name (necessary for alabama)
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


def precinct_data_from_block(file):
    prec = gpd.read_file(f'{file} precinct shape.zip')
    blocks = gpd.read_file(f'{file}_census.geojson')
    prec['geometry'] = prec.geometry.to_crs("epsg:3857")
    variables = ["TOTAL_REG", "ETH1_EUR", "ETH1_HISP", "ETH1_AA", "ETH1_ESA", "ETH1_UNK",
                 "VOTERS_GENDER_M", "VOTERS_GENDER_F", "VOTERS_GENDER_UNKNOWN",
                 "PARTY_DEM", "PARTY_REP", "PARTY_OTHER"]
    blocks_to_precincts_assignment = maup.assign(blocks, prec)
    prec[variables] = blocks[variables].groupby(blocks_to_precincts_assignment).sum()
    write_as_geojson(prec, "DE_precincts")


def create_file(state, debug=False):
    """
    :param state: Either "AL" or "DE" for which state you would like to use
    :param debug: True or False
    :return: Geojson written
    """
    block = gpd.read_file(f'{state} census shape.zip')
    block.drop(columns=['UACE20'], inplace=True)  # data in UACE20 has yet to be assigned as of 2024

    file_path = f'{state}_2022stats.zip'
    block_stats = census_block_stats(file_path)
    
    # only state specific calculations
    if state == 'AL':
        block_stats = block_stats.iloc[61:]
        block_stats = block_stats.iloc[:-4]  # no assignments
    elif state == 'DE':
        block_stats = block_stats.iloc[:-3]

    block = pd.merge(block, block_stats, on="GEOID20")

    district = gpd.read_file(f'{state}_sldl.zip')

    # preprocessing
    add_districts(block, district, False)
    drop_unecessary_columns(block)

    created_file = write_as_geojson(block, f'{state}_census')

    if debug:
        block.plot(column="DISTRICT", cmap="tab20")
        district.plot(cmap="tab20")
        plt.show()

    return created_file


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
    with open('DE_precincts.csv', 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        column_names = ['PRECINCT', 'CANDIDATE', 'PARTY', 'VOTES', 'PERCENTAGE']
        desired_columns = [0, 1, 5, 6]
        csv_writer.writerow(column_names)

        all_precinct_datas = div.find_all('table')

        for i, data in enumerate(all_precinct_datas):
            rows = data.find_all('tr')
            precinct = data.find_previous_sibling('h4').get_text(strip=True)

            for row in rows[1:]:  # skip first row, its headers
                row_data = [cell.get_text(strip=True) for cell in row.find_all('td')]
                filtered_row_data = [row_data[i] for i in desired_columns]
                data = [precinct] + filtered_row_data
                csv_writer.writerow(data)

            if not i % 50:
                print(f'iteration: {i}')

    print("Done writing")


if __name__ == '__main__':
    # get_de_by_precinct_csv()
    blocks = create_file("DE")
    precinct_data_from_block("DE")
    #blocks = create_file("AL")
    #precinct_data_from_block("AL")

    print("done")