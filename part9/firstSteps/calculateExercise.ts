interface ReturnValues {
    periodLength: number,
    trainingDays: number,
    average: number,
    success: boolean
}

interface parseReturn {
    target: number,
    values: Array<number>
}
export const parseArguments = (args: string[]): parseReturn => {
    let target = 0;
    if (args.length <= 4) {
        throw new Error ('Not enough arguments!');
    }
    if (!isNaN(Number(args[2]))) {
        target = Number(args[2]);
    }
    const values: Array<number> = args.slice(3).map(x => { if (isNaN(Number(x))) {console.log(x); throw new Error ('Not a number');} return Number(x);});

    return {target, values};
};
export const calculateExercise = (values:number[], target:number): ReturnValues => {
    const averageHours = values.reduce((a,b) => a+b, 0)/values.length;

    const result = {
        periodLength: values.length,
        trainingDays: values.filter(value => value > 0).length,
        target: target,
        average: averageHours,
        success: averageHours >= target,
    };

    return result;
};

