import json
import random

# Input and output file paths
INPUT_FILE = r"games\sumfing\assets\oldpuzzles.json"
OUTPUT_FILE = r"games\sumfing\assets\puzzles.json"

def restructure_puzzles(data):
    transformed = {}

    for date, puzzles in data.items():
        entry = {
            "Tiles": puzzles["Tiles"],
            "Easy": puzzles["Easy"]
        }

        # Randomly keep either Medium or Hard
        keep_medium = random.choice([True, False])

        if keep_medium:
            entry["Medium"] = puzzles["Medium"]
        else:
            entry["Medium"] = puzzles["Hard"]

        # Promote Extra to Hard
        entry["Hard"] = puzzles["Extra"]

        transformed[date] = entry

    return transformed

def main():
    # Load the original puzzle data
    with open(INPUT_FILE, "r") as infile:
        puzzles = json.load(infile)

    # Restructure
    transformed = restructure_puzzles(puzzles)

    # Save to new file
    with open(OUTPUT_FILE, "w") as outfile:
        json.dump(transformed, outfile, indent=2)

    print(f"✔️ Restructured puzzles saved to '{OUTPUT_FILE}'")

if __name__ == "__main__":
    main()
