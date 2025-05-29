import json
import os

# Load sums
with open(r"games\sumfing\assets\gradedsums.json") as sumsfile:
    sumsdata = json.load(sumsfile)

for level in ['Easy', 'Medium', 'Hard']:
    print (f"** {level} **")
    for sum, difficulty in sumsdata.items():
        if level == difficulty:
            print (sum)        

# Features of easy sums:

# only one operator
# if * or /; the sum must be in times tables
# if + or -, one number may have 2 or 3 digits . The other must have 1 digit

# Features of hard sums:

# Any sum with ^ or !
# Any number bigger than 100 (and not easy)
# Any non times table multiplication (where one number is not a multiple of 10)  8*20+1 counts as medium

# All others are medium