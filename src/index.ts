function intersection(set1: Set<number>, set2: Set<number>): number[] {
    return Array.from(set1).filter(Set.prototype.has.bind(set2));
}
function sbtract(set1: Set<number>, set2: Set<number>): number[] {
    return Array.from(set1).filter(n=>!set2.has(n));
}
type Occurrency = {
    str: string;
    count: number;
}
function getSortedOccurrences(array: string[]): Occurrency[] {
    const mapOccurrences = array.reduce((map, str) => {
        const count = map.get(str) ?? 0;
        map.set(str, count + 1)
        return map;
    }, new Map<string, number>())
    return Array.from(mapOccurrences)
    .map(e => ({str:e[0], count:e[1]}))
    .sort((o1, o2)=>o2.count - o1.count || o1.str.localeCompare(o2.str));
}
Set.prototype.toString = function() {return Array.from(this).toString()} 
const set1 = new Set<number>([1, 2, 3, 4, 5]);
const set2 = new Set<number>([2, 5, 7, -10])
console.log(`set1: ${set1}`)
console.log(`set2: ${set2}`)
console.log(`intersection(set1, set2)=${intersection(set1, set2)}`);
console.log(`sbtract(set1, set2) = ${sbtract(set1, set2)}`);
console.log('__'.repeat(20))
console.log(getSortedOccurrences(['lmn', 'ab', 'a', 'cd', 'lmn', 'cd', 'lmn']))