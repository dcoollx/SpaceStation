function getGCD(a: number, b: number): number{
    return b ===0 ? a : getGCD(b, a%b);
} 
interface aspectRatio  {
    x:number, y:number
}
export function getAspectRation(): aspectRatio{

    const gcd = getGCD(screen.width, screen.height);
    return {x : screen.width/gcd, y : screen.height / gcd}

}

export default function setTargetSize(ratio: aspectRatio = getAspectRation()): {height :number, width: number}{
    return {height : 10, width: 10};
}