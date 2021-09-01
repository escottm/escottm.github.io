
const qDate = window.location.search.replace(/\??/, "");    // query string minus the leading '?'

const checkDateFmt = ['YYYY-M-D', 'YYYY-MM-DD', 'MM-DD-YYYY'];
const formatYMD = 'YYYY-MM-DD';
const customDate = dayjs( qDate, checkDateFmt, true ).isValid();    // isValid() is a wonderful thing

const checkDate = dayjs( customDate? qdate : undefined );   //  dayjs object
const ymd = checkDate.format(formatYMD);                    //  string representation of dayjs object as YYYY-MM-DD

console.log( `ocegal: looking up info for ${ymd}`);
const API = `https://tahanun.herokuapp.com/?date=${ymd}`;

const tahanun = await fetch( API )
    .then( res => res.json() )  // get me the json...
    .then( json => distTahanunInfo(json))   //  fill the page with info from that json
    .catch( err => console.error(`ocegal: fetch() failed with "${err}"`));

const found = ( ar, text ) => 
    ( (ar !== undefined) && (ar.findIndex( s => s === text ) != -1));

function isRecited( tahanun, service, namedServices ) {
    const listed = found( namedServices, service );
    console.log( `isRecited(${service}): listed=${listed} ` );
    return ( (tahanun && listed) || (!tahanun && !listed));
}

const reciteOmit = ( recite ) => 
    recite
    ? "Taḥanun is recited"
    : "Taḥanun is omitted";

const reciteOmitClass = ( service, recited ) =>
    (recited ? "recite" : "omit") + `__${service}`;

function distTahanunInfo( t ) {
    console.log(t);
    try {
        document.getElementById('heb__date').textContent =`${t.hd} ${t.hm} ${t.hy}`;
        document.getElementById('sec__date').textContent = `${checkDate.format('ddd DD MMM YYYY')}`;

        if ( t.title ) {        //  Anything named (including erev) gets a 'title'
            document.getElementById('holiday').textContent = t.title;
        }
        const minha = isRecited( t.tahanun, 'minha', t.services);
        const shaharit = isRecited( t.tahanun, 'shaharit', t.services);
        
        const minhaElem = document.getElementById( 'tahanun__minha' );
        const shaharitElem = document.getElementById( 'tahanun__shaharit' );

        minhaElem.classList.add( reciteOmitClass( 'minha', minha )); // allow for different styling for recite/omit & shacharit/mincha
        shaharitElem.classList.add( reciteOmitClass( 'shaharit', shaharit )); // ditto

        minhaElem.textContent = 'Minḥa: ' + reciteOmit( minha );
        shaharitElem.textContent = 'Shaḥarit: ' + reciteOmit( shaharit );

    }
    catch (err) {
        console.error(`ocegal: unexpected error: "${err}"`)
    };
    
}