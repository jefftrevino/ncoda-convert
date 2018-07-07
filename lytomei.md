sequenceDiagram
  participant user
  participant atom
  participant ncodaconvert
  participant script
  participant lychee.converters

  user->>atom: calls activation function on current text editor (.ly)
  atom->>ncodaconvert: passes reference to .ly file
  ncodaconvert->>script: calls lychee conversion .py script on .ly file
  script->>lychee.converters: passes .ly to Python environment for conversion
  lychee.converters->>script: returns MEI section string to listener
  script->>ncodaconvert: returns MEI section
  ncodaconvert->>atom: puts MEI section into valid MEI file and opens it in new Atom editor
  atom->>user: displays corresponding MEI file
