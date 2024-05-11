import pandas as pd
from bs4 import BeautifulSoup
import csv
import json

def remove_columns(input_file, output_file, columns_to_remove):
    with open(input_file, 'r') as csv_input, open(output_file, 'w', newline='') as csv_output:
        reader = csv.reader(csv_input)
        writer = csv.writer(csv_output)

        for row in reader:
            # Create a new row without the specified columns
            new_row = [row[i] for i in range(len(row)) if i not in columns_to_remove]
            writer.writerow(new_row)


# Example usage:
input_file = 'input.csv'
output_file = 'output.csv'
columns_to_remove = [1, 3]  # List of column indices to remove
remove_columns(input_file, output_file, columns_to_remove)

'''

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
        if 'JOSEPH R. BIDEN JR.' in candidate_name:
            data_dict['Biden Percentage'] = cells[-1].text.strip().replace('%', '').strip()
        elif 'DONALD J. TRUMP' in candidate_name:
            data_dict['Trump Percentage'] = cells[-1].text.strip().replace('%', '').strip()
        elif 'HOWIE HAWKINS' in candidate_name:
            data_dict['Hawkins Percentage'] = cells[-1].text.strip().replace('%', '').strip()
        elif 'JO JORGENSEN' in candidate_name:
            data_dict['Jorgensen Percentage'] = cells[-1].text.strip().replace('%', '').strip()
    results.append(data_dict)

# Create a DataFrame
df = pd.DataFrame(results)

df.rename(columns={'Election District': 'RDED'}, inplace=True)

district_data = pd.read_csv('DE_precincts_updated.csv')

district_data['RDED'] = district_data['RDED'].astype(str)
df['RDED'] = df['RDED'].astype(str)

merged_data = pd.merge(district_data, df, on='RDED', how='left')
merged_data.to_csv('DE_precincts_updated2.csv', index=False)

# Print the DataFrame
print(df)

print(len(tables))
'''
'''with open('DE_precincts_updated.csv', 'r', newline='') as csvfile:
    reader = csv.reader(csvfile)
    data = list(reader)
    writer = csv.writer(csvfile)

    data[0].append('pct_for_biden')
    data[0].append('pct_for_trump')
    for i in range(1, len(tables)):
        data[i].append(biden_data[i-1])
        data[i].append(trump_data[i-1])

with open('DE_precincts.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(data)'''

