import Enitity from './Entity';

export default class Character extends Enitity{
    constructor(key:string, sprite:string, frameData:any){
        super(key,sprite,frameData);
    }
}