
async function fetchIt( str ) {
    const res = await fetch( str );
    if (res.ok ) {
        const ret = await res.json();
        console.log( `Debug: in fetchIt(): return status ${res.status}, json "${JSON.stringify(ret)}"`);
        return ret;   
    
    }
    console.error( `fetch() apparently failed: ${res.status}`);
    return null;

} 

const gregDate = new Date();
const dd = gregDate.getDate().toString().padStart(2, '0');
const mmm = gregDate.getMonth()+1
const mm = mmm.toString().padStart(2, '0');
const yy = gregDate.getFullYear().toString().padStart(2, '0');

const hcal = `https://www.hebcal.com/converter?cfg=json&gy=${yy}&gm=${mm}&gd=${dd}&g2h=1`;

const caljson = fetchIt( hcal );

if ( !caljson ) {
    console.error( 'fetchIT() returned null; keep debugging, buddy')
} else {
    console.log( `debug: caljson=="${JSON.stringify(caljson)}"`);
    document.writeln( `Today's Hebrew date: ${caljson.hd} ${caljson.hm} ${caljson.hy} (${caljson.hebrew})`);
    console.log('script complete /escott')
}
