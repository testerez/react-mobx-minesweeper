import {observable, action} from 'mobx';

export default class Ui{
    @observable showSettings = false;

    @action toggleShowSettings(state: boolean|undefined = undefined){
        if(state === undefined){
            state = !this.showSettings;
        }
        this.showSettings = state;
    }
}