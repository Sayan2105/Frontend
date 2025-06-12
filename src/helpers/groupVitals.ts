import { VitalType } from "@/types/opd_section/vitals";


const groupedBYdate = (arr: VitalType[]): { date: string; measure: VitalType[] }[] => {

    const groupedArray: { date: string; measure: VitalType[] }[] = [];

    for (let elem of arr) {

        const { date } = elem;

        const existingGroup = groupedArray.find(group => group.date === date);

        if (existingGroup) {
            existingGroup.measure.push(elem);
        } else {
            groupedArray.push({ date, measure: [elem] });
        }
    }

    return groupedArray
};

export default groupedBYdate