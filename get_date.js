
async function fetchIt( str ) {
    const res = await fetch( str );
    if (res.ok ) {
        const ret = await res.json();
    } else {
        console.error( `fetch() apparently failed: ${res.status}`)
    }
    return ret;
} 

const gregDate = new Date();
const dd = gregDate.getDay().toString().padStart(2, '0');
const mm = gregDate.getMonth().toString().padStart(2, '0');
const yy = gregDate.getFullYear().toString().padStart(2, '0');

const hcal = `https://www.hebcal.com/converter?cfg=json&gy=${yy}&gm=${mm}&gd=${dd}&g2h=1`;

const caljson = await fetchIt( hcal );

console.log( `debug: caljson=="${JSON.stringify(caljson)}"`);
document.writeln( `Today's Hebrew date: ${caljson.hd} ${caljson.hm} ${caljson.hy} (${caljson.hebrew})`);
console.log('script complete /escott')