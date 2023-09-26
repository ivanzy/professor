import csv
import statistics
import sys
import os

# Check if the user provided a filename as a command-line argument
if len(sys.argv) != 2:
    print("Usage: python script.py <filename>")
    sys.exit(1)

# Extract the filename from the command-line argument
filename = sys.argv[1]

# Construct the full file path
file_path = os.path.join('..', 'src', 'new-experiments', f'{filename}.csv')

# Lists to store the values from the last column
values = []

# Read the CSV file and extract values from the last column
with open(file_path, 'r') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    for row in csv_reader:
        # Assuming the last column is a float or numeric value
        last_column_value = float(row[-1])
        values.append(last_column_value)

# Calculate the average (mean) and standard deviation
if values:
    average = statistics.mean(values)
    std_deviation = statistics.stdev(values)
    print(f'Average: {average:.2f}')
    print(f'Standard Deviation: {std_deviation:.2f}')
else:
    print('No data found in the last column.')
