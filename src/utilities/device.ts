function getGCD(a: number, b: number): number{
    return b ===0 ? a : getGCD(b, a%b);
} 
interface aspectRatio  {
    x:number, y:number
}
export function getAspectRatio(): aspectRatio{

    const gcd = getGCD(screen.width, screen.height);
    return {x : window.innerWidth/gcd, y : window.innerHeight / gcd}

}

export default function setTargetSize(ratio: aspectRatio = getAspectRatio()): {height :number, width: number}{
    let decimal = ratio.x/ratio.y;
    return {height : window.innerWidth/decimal, width:window.innerWidth};
}