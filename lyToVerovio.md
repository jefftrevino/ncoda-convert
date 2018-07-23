sequenceDiagram
  participant user
  participant atom
  participant ncodaconvert
  participant meitoolsatom
  participant verovio
  participant lychee.converters

  user->>atom: calls activation function on current text editor (.ly)
  atom->>ncodaconvert: passes path to active editor's file
  ncodaconvert-->>lychee.converters: calls script on editor path
  lychee.converters-->>ncodaconvert: returns conversion result
  ncodaconvert->>meitoolsatom: passes resulting mei string
  meitoolsatom->>veroviodev: passes mei for render
  veroviodev->>meitoolsatom: returns svg for display
  meitoolsatom->>atom: opens verovio output in new pane
  atom->>user: displays notation to user
