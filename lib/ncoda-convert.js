'use babel';

import NcodaConvertView from './ncoda-convert-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  ncodaConvertView: null,
  modalPanel: null,
  subscriptions: null,
  defaultScriptRuntime: null,

  activate(state) {
    this.ncodaConvertView = new NcodaConvertView(state.ncodaConvertViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ncodaConvertView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ncoda-convert:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ncodaConvertView.destroy();
  },

  serialize() {
    return {
      ncodaConvertViewState: this.ncodaConvertView.serialize()
    };
  },

  toggle() {
    console.log('NcodaConvert was toggled!');
    console.log(this.defaultScriptRuntime)
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },
  consumeDefaultRuntime(defaultScriptRuntime) {
    this.defaultScriptRuntime = defaultScriptRuntime

    return new Disposable(() => {
      this.defaultScriptRuntime = null;
    });
  }

};
