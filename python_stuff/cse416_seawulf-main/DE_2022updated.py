import pandas as pd

# Read the dataset from CSV
df = pd.read_csv('DE_2022stats.csv')

# Remove the specified columns
columns_to_keep = ['geoid20', 'total_reg', 'eth1_aa', 'eth1_eur', 'g20221108_voted_all', 'g20221108_pct_voted_all']
df = df[columns_to_keep]

# Save the updated dataset to a new CSV file
df.to_csv('DE_2022_updated_stats', index=False)

print("Dataset has been updated and saved to 'updated_dataset.csv'")
