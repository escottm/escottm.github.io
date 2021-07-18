
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

function is_hol( today, hols ) {
    if ( hols.length < 1 ) return null;

    console.log( `is_hol() debug: Today: ${today}  Holiday: ${hols[0].date} `)

    if ( hols[0].date === today ) return hols[0].hebrew;
    return is_hol( today, hols.splice(1));
}


async function tahanun_today(hdate) {

    const t = new Date();
    const mnth = t.getMonth() + 1;
    const d = t.getDate();
    const today$ = `${t.getFullYear()}-${mnth.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;

    const holAPI = `https://www.hebcal.com/hebcal?v=1&cfg=json&year=now&month=${mnth}&maj=on&min=on&nx=on&mf=on&mod=on`;

    const hebinfo = await fetchIt( holAPI );  // return json with all this month's observance dates, inter alia

    const hols = hebinfo.items;   //  Array of observance dates (json)

    console.log(`tahanun_today() debug: today is ${today$}`);

    return is_hol( today$, hols );

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

    const holiday_today = await tahanun_today( {day: dd, month: mm} );
    document.getElementById('tahanun').innerHTML =
        (holiday_today != null)
        ? 'Taḥanun is recited today'
        : 'NO TA&#7716NUN TODAY'

    document.getElementById('holiday').innerHTML = holiday_today;

    console.log('get_date.js script complete')
}
