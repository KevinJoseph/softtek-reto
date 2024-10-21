import { GenericObject } from "../types/GenericObject";

//export function translate(schema: GenericObject, map: any): GenericObject{
export function translate<T extends GenericObject>(schema: GenericObject, map: T): GenericObject{
    let schemaValue;
    let mapKey;
    let mappedKey: string;
    const mapKeys = Object.keys(map);
    const translatedObject: GenericObject = {};

    for (mapKey of mapKeys) {
        schemaValue = schema[mapKey as string];
        mappedKey = map[mapKey] as string;

        translatedObject[mappedKey] = schemaValue;
    }

    return translatedObject
}