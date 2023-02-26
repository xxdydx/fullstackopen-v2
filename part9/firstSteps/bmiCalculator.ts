export const bmiCalculator = (height: number, weight:number ): string => {
    const bmi = weight / ((height /100) ** 2);
    if (bmi < 18.5) {
        return 'Underweight';
    }

    if (bmi >= 18.5 && bmi < 25) {
        return 'Acceptable';
    }

    if (bmi >= 25) {
        return `Overweight, BMI: ${bmi}`;
    }

    else {
    throw new Error('Not a number');}
};
