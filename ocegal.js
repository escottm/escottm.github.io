
const qDate = window.location.search.replace(/\??/, "");

console.log( `ocegal: /?${qDate}`);
const d = (qDate.length == 0)
        ? new Date()
        : new Date( qDate );
const mon = ['Jan', 'Feb', 'Mar',
             'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep',
             'Oct', 'Nov', 'Dec'](d.getUTCMonth());
const today = `${mon} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
console.log( `ocegal: looking up info for ${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`)
const API = `https://tahanun.herokuapp.com/?date=${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`;

const tahanun = fetch( API )
    .then( res => res.json() )  // I think I get it...
    .then( json => distTahanunInfo(json))
    .catch( err => console.error(`ocegal: fetch() failed with "${err}"`));

const found = ( ar, text ) => ( (ar !== undefined) && (ar.findIndex( s => s === text ) != -1));

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
        document.getElementById('sec__date').textContent = today;

        if ( t.title ) {
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