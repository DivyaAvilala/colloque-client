
export function stripTag( input ){
    input = input.replace(/<(?:.|\n)*?>/gm, "");
    return input.replace(/(&nbsp;)/g," ")
};

