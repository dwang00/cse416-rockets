import pandas as pd
from bs4 import BeautifulSoup
import csv
import json

with open('delaware_website_html.txt', 'r') as file:
    html_content = file.read()

soup = BeautifulSoup(html_content, 'html.parser')

# Initialize a list to store the data
results = []

# Find all election district divisions
districts = soup.find_all('h4', class_='electiondistrict-title')
tables = soup.find_all('table', class_='table table-sm RepresentativeinCongress')


for district, table in zip(districts, tables):
    district_number = district.text.strip().split()[-1]
    rows = table.find_all('tr')[1:]  # Skip the header row

    # Initialize the dictionary to store Biden's and Trump's percentages
    data_dict = {'Election District': district_number}

    # Extract the percentages for Biden and Trump
    for row in rows:
        cells = row.find_all('td')
        candidate_name = cells[0].text.strip()
        if 'LISA BLUNT ROCHESTER' in candidate_name:
            data_dict['rochester_votes'] = cells[-2].text.strip().replace(',', '').strip()
        elif 'LEE MURPHY' in candidate_name:
            data_dict['murphy_votes'] = cells[-2].text.strip().replace(',', '').strip()

    results.append(data_dict)

# Create a DataFrame
df = pd.DataFrame(results)

df['rochester_votes'] = pd.to_numeric(df['rochester_votes'])
df['murphy_votes'] = pd.to_numeric(df['murphy_votes'])
df['total_votes'] = df['rochester_votes'] + df['murphy_votes']

df['pct_rochester'] = df['rochester_votes'] / df['total_votes']
df['pct_murphy'] = df['murphy_votes'] / df['total_votes']

df.rename(columns={'Election District': 'RDED'}, inplace=True)

district_data = pd.read_csv('DE_precincts_updated.csv')

district_data['RDED'] = district_data['RDED'].astype(str)
df['RDED'] = df['RDED'].astype(str)

merged_data = pd.merge(district_data, df, on='RDED', how='left')

merged_data['ETH1_EUR'] = pd.to_numeric(merged_data['ETH1_EUR'])
merged_data['ETH1_AA'] = pd.to_numeric(merged_data['ETH1_AA'])
merged_data['ETH1_UNK'] = pd.to_numeric(merged_data['ETH1_UNK'])
merged_data['totalPop'] = merged_data['ETH1_EUR'] + merged_data['ETH1_AA'] + merged_data['ETH1_UNK']


merged_data['pct_eur'] = merged_data['ETH1_EUR'] / merged_data['totalPop']
merged_data['pct_aa'] = merged_data['ETH1_AA'] / merged_data['totalPop']
merged_data['pct_other'] = merged_data['ETH1_UNK'] / merged_data['totalPop']

columns_to_normalize = merged_data[['pct_rochester', 'pct_murphy']]
row_sums = columns_to_normalize.sum(axis=1)
normalized_cols = columns_to_normalize.div(row_sums, axis=0)
merged_data[['pct_rochester', 'pct_murphy']] = normalized_cols

columns_to_normalize = merged_data[['pct_eur', 'pct_aa', 'pct_other']]
row_sums = columns_to_normalize.sum(axis=1)
normalized_cols = columns_to_normalize.div(row_sums, axis=0)
merged_data[['pct_eur', 'pct_aa', 'pct_other']] = normalized_cols

merged_data.to_csv('DE_precincts_updated3.csv', index=False)

