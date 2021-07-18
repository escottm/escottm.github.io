
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

//  returns {holiday: true|false, hebrew: null|hebrew name of holiday}

function holiday( today, hols ) {
    if ( hols.length < 1 ) return {holiday: false, hebrew: null};

    console.log( `is_hol() debug: Today: ${today}  Holiday: ${hols[0].date} ${hols[0].hebrew}`)

    if ( hols[0].date === today ) 
        return ({holiday: true, hebrew: hols[0].hebrew});
    return holiday( today, hols.splice(1));
}

function shortdate () {
    const t = new Date();
    const mnth = t.getMonth() + 1;
    const d = t.getDate();

    return `${t.getFullYear()}-${mnth.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`
}


async function tahanun_today(hdate) {
    const today$ = shortdate();

    const mnth = today$.slice(5,7); // extract the month from yyyy-mm-dd

    const holAPI = `https://www.hebcal.com/hebcal?v=1&cfg=json&year=now&month=${mnth}&maj=on&min=on&nx=on&mf=on&mod=on`;

    const hebinfo = await fetchIt( holAPI );  // return json with all this month's observance dates, inter alia

    const hols = hebinfo.items;   //  Array of observance dates (json)

    console.log(`tahanun_today() debug: today is ${today$}`);

    return holiday( today$, hols ).holiday;

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

    const tahanunYN = await tahanun_today( {day: dd, month: mm} );
    document.getElementById('tahanun').innerHTML =
        (tahanunYN)
        ? 'Taḥanun is recited today'
        : 'NO TA&#7716NUN TODAY'

    document.getElementById('holiday').innerHTML = 
        holiday()
        ? `Today is ${holiday_today}`
        : '';

    console.log('get_date.js script complete')
}
