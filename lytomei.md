sequenceDiagram
  participant user
  participant atom
  participant ncodaconvert
  participant lychee.converters

  user->>atom: calls activation function on current text editor (.ly)
  atom->>ncodaconvert: passes path to active editor's file
  ncodaconvert->>lychee.converters: calls script on editor path
  lychee.converters->>ncodaconvert: returns conversion result
  ncodaconvert->>atom: opens conversion result in new atom editor
  atom->>user: displays conversion result to user
