export namespace TypeGuards
{
    export const hasValue = <T>(value: T | null | undefined): value is T =>
        value !== null && value !== undefined;
    export const has = <KeyType extends string | string[]>(keyOrKeys: KeyType) =>
        <ObjectType>(object: ObjectType | undefined): object is ObjectType &
        (
            KeyType extends string ?
                { [PropertyName in KeyType]: Exclude<PropertyName extends keyof ObjectType ? ObjectType[PropertyName] : any, undefined> }:
                KeyType extends string[] ?
                    { [Prop in KeyType[number]]: Exclude<Prop extends keyof ObjectType ? ObjectType[Prop] : any, undefined> }:
                    never
        ) =>
        {
            if (Array.isArray(keyOrKeys)) {
                return keyOrKeys.every(key => object?.[key as keyof ObjectType] !== undefined);
            } else {
                return object?.[keyOrKeys as string as keyof ObjectType] !== undefined;
            }
        };
}
