import json
import os

def grade(sum_str):
    while True:
        key = input(f"(E)asy, (M)edium, (H)ard or (R)eject? {sum_str} :  ")
        key = key.lower()
        if key == 'e':
            return 'Easy'
        elif key == 'm':
            return 'Medium'
        elif key == 'h':
            return 'Hard'
        elif key == 'r':
            return 'Reject'

# Load existing gradedsums if it exists
graded_file = r"games\sumfing\assets\gradedsums.json"
if os.path.exists(graded_file):
    with open(graded_file, 'r') as f:
        gradedsums = json.load(f)
else:
    gradedsums = {}

# Load puzzles
with open(r"games\sumfing\assets\puzzles.json") as puzzlesfile:
    puzzlesdata = json.load(puzzlesfile)

# Grade new puzzles
for day, puzzles in puzzlesdata.items():
    for stage in ('Easy', 'Medium', 'Hard', 'Extra'):
        puzzle = puzzles[stage]
        ans = puzzle[0]
        expression = puzzle[1][0]
        sum_str = f'{expression} = {ans}'

        if sum_str in gradedsums:
            continue  # Skip already graded
        level = grade(sum_str)
        gradedsums[sum_str] = level
        print(f'{sum_str} is graded as {level}')

        # Save updated graded sums
        with open(graded_file, 'w') as f:
            json.dump(gradedsums, f, indent=2)
        
