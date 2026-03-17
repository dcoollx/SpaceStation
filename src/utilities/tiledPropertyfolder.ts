// tiled outputs properties in an array like
// [{name, value, type}]
// this should change it to a typical json object

interface TiledObjectLayerProperty {
    name: string,
    type: 'string' | 'bool' | 'object' | 'int'
    value: string | boolean | object | number 
}

export const tiledPropertyfolder = (properties?: TiledObjectLayerProperty[]): Record<string,string | boolean | object | number > | null  => {
    if(!properties || !properties.length){
        return null;
    }
    return properties.reduce((acc, property)=>{
        return {...acc, [property.name] : property.value}
    },{});
}
