
async function fetchIt( str ) {
    const res = await fetch( str );
    if (res.ok ) {
        const ret = await res.json();
        console.log( `fetchIt(): return status ${res.status}, json "${JSON.stringify(ret)}"`);
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

const caljson = await fetchIt( hcal );

if ( !caljson ) {
    console.error( 'fetchIt() returned null; keep debugging, buddy')
} else {
    const format_str = `${caljson.hd} ${caljson.hm} ${caljson.hy} (${caljson.hebrew})`
    // document.writeln( `Today's Hebrew date: ${caljson.hd} ${caljson.hm} ${caljson.hy} (${caljson.hebrew})`);
    document.getElementById('full__date').innerHTML = format_str;
    document.getElementById('heb__date').innerHTML = caljson.hd;
    document.getElementById('heb__month').innerHTML = caljson.hm;
    document.getElementById('heb__year').innerHTML = caljson.hy;
    
    console.log('get_date.js script complete')
}
