'use babel';

import NcodaConvertView from './ncoda-convert-view';
import { CompositeDisposable, Disposable } from 'atom';
import ConsoleRuntimeObserver from './observer'


export default {

  ncodaConvertView: null,
  modalPanel: null,
  subscriptions: null,
  blankScriptRuntime: null,

  activate(state) {
    atom.packages.loadPackage('script').activateNow()
    this.ncodaConvertView = new NcodaConvertView(state.ncodaConvertViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ncodaConvertView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ncoda-convert:toggle': () => this.toggle(),
      'ncoda-convert:runBlank': () => this.runBlank()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ncodaConvertView.destroy();
    this.blankScriptRuntime.destroy()
  },

  serialize() {
    return {
      ncodaConvertViewState: this.ncodaConvertView.serialize()
    };
  },

  toggle() {
    console.log('NcodaConvert was toggled!');
    console.log(this.blankScriptRuntime)
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },
  consumeBlankRuntime(runtime) {
      this.blankScriptRuntime = runtime;
      this.observer = new ConsoleRuntimeObserver
      return this.blankScriptRuntime.addObserver(this.observer);
  },
  activatePackage(packageName) {
    scriptIsLoaded = atom.packages.activePackages[packageName]
    if (scriptIsLoaded) {
      thePackage = atom.packages.loadPackage(packageName)
    }
    else {
        throw(new Error("Package not installed: ${packageName}"))
    }
    thePackage.activateNow()
  },
  runBlank(){
    this.activatePackage('script')
    console.log(this.blankScriptRuntime)
    this.blankScriptRuntime.execute("Selection Based", "pwd")
  }
}
