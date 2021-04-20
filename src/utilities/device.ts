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
    let customRatio = ratio === getAspectRatio();
    let width =  window.innerWidth ;
    let height = window.innerWidth/decimal;
    if(height > window.innerHeight){//height is greater than screen
        height = window.innerHeight
        width = height * decimal;
    }
    return {width, height};

}