export const requiredField = (value:string) => {
    if(value) {
        return undefined;
    }

    return 'Field is required';
}

const maxLength30 = (value:string) => {
    if(value && value.length > 30) {
        return 'Max length is 30 symbols';
    }
    return undefined;
}

export const maxLengthCreator = (maxLength:number) => (value:string ) => {
    if(value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols`;
    }
    return undefined;
}