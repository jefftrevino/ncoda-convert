'use babel';

import { CompositeDisposable, Disposable, BufferedProcess } from 'atom';

const path = require('path')
const tempWrite = require('temp-write')


export default {

  ncodaConvertView: null,
  modalPanel: null,
  subscriptions: null,
  blankScriptRuntime: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ncoda-convert:lyToMei': () => this.lyToMei()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  lyToMei(){
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      const editorPath = editor.getPath()
      if (editorPath.slice(-3) === ".ly") {
        options = {cwd: atom.project.getPaths()[0], env: process.env}
        //options = {env: process.env}
        // const command = 'python dummy.py'
        const command = "python"
        const args = ["conversion-scripts/ly_to_lmei_to_mei.py", editorPath]
        // const stdout = (output) => atom.workspace.open()
        const stdout = (output) => {
          outputFileString = editorPath.slice(0,-3) + '.mei'
          //write the stdout string to a temporary file
          const tmpFilePath = tempWrite.sync(output, outputFileString)
          const newEditor = atom.workspace.open(tmpFilePath)
          // newEditor.activate()
          // const activeEditor = atom.workspace.getActiveTextEditor()
          // activeEditor.insertText(output)
        }
        const stderr = (output) => console.log("stderr", output)
        const exit = (return_code) => console.log("Return code", return_code)
        const bufferedProcess = new BufferedProcess({command, args, options, stdout, stderr, exit})
      }
      else { atom.notifications.addError("This isn't a LilyPond file.")}
    }
    else {
      atom.notifications.addError("There wasn't an active text editor.")
    }
  }

}
