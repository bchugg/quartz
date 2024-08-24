import os 
import re 

def reformat_latex(file_path):
    # Open the file and read all lines
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Create a list to store the updated lines
    updated_lines = []

    # Iterate through each line in the file
    for line in lines:
        # Check if the line matches the pattern $$<content>$$
        if line.strip().startswith('$$') and line.strip().endswith('$$') and len(line.strip()) > 4:
            # Extract the content between the $$ symbols
            content = line.strip()[2:-2].strip()
            # Replace with the desired format
            updated_line = f"$$\n{content}\n$$\n"
            updated_lines.append(updated_line)
        else:
            # If the line doesn't match, keep it as is
            updated_lines.append(line)

    # Write the updated lines back to the file
    with open(file_path, 'w') as file:
        file.writelines(updated_lines)

def reformat_subsection_links(file_path): 
    # Open the file and read all lines
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Create a pattern to match [[<content1>#<content2>]]
    pattern = re.compile(r'\[\[(.+?)#(.+?)\]\]')

    # Create a list to store the updated lines
    updated_lines = []

    # Iterate through each line in the file
    for line in lines:
        # Search for the pattern in the line
        matches = pattern.findall(line)
        if matches:
            # Replace each match with the desired format
            for match in matches:
                content1, content2 = match
                replacement = f"[[{content1}#{content2}|{content1}:{content2}]]"
                line = line.replace(f"[[{content1}#{content2}]]", replacement)
        # Add the updated line to the list
        updated_lines.append(line)

    # Write the updated lines back to the file
    with open(file_path, 'w') as file:
        file.writelines(updated_lines)

def add_space_to_header(file_path):
    # Open the file and read all lines
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Create a list to store the updated lines
    updated_lines = []

    # Iterate through each line in the file
    for line in lines:
        
        # Add current line 
        updated_lines.append(line)

        # Add space after line if it is a header
        if line.startswith('---'):
            updated_lines.append('\n')
        

    # Write the updated lines back to the file
    with open(file_path, 'w') as file:
        file.writelines(updated_lines)


if __name__ == '__main__':
    # reformat markdown on all markdown files in content directory
    for file in os.listdir('../content'):
        if file.endswith('.md'):
            reformat_latex(os.path.join('../content', file))
            reformat_subsection_links(os.path.join('../content', file))
            add_space_to_header(os.path.join('../content', file))
