
const qDate = window.location.search.replace(/\??/, "");

console.log( `ocegal: /?${qDate}`);
const d = (qDate.length == 0)
        ? new Date()
        : new Date( qDate );

const API = `http://localhost:8080?date=${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

const tahanun = fetch( API )
    .then( res => res.json() )  // I think I get it...
    .then( json => distTahanunInfo(json))
    .catch( err => console.error(`ocegal: fetch() failed with "${err}"`));

const found = ( ar, text ) => ( (ar !== undefined) && (ar.findIndex( s => s === text ) != -1));

function isRecited( tahanun, service, namedServices ) {
    const listed = found( namedServices, service );
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
        document.getElementById('full__date').textContent =`${t.hd} ${t.hm} ${t.hy}`;

        const minha = isRecited( t.tahanun, 'minha', t.services);
        const shaharit = isRecited( t.tahanun, 'shaharit', t.services);
        
        const minhaElem = document.getElementById( 'tahanun__minha' );
        const shaharitElem = document.getElementById( 'tahanun__shaharit' );

        minhaElem.classList.add( reciteOmitClass( 'minha', minha )); // allow for different styling for recite/omit messages
        shaharitElem.classList.add( reciteOmitClass( 'shaharit', shaharit )); // allow for different styling for recite/omit messages

        minhaElem.textContent = 'Minḥa: ' + reciteOmit( minha );
        shaharitElem.textContent = 'Shaḥarit: ' + reciteOmit( shaharit );

    }
    catch (err) {
        console.error(`ocegal: unexpected error: "${err}"`)
    };
    
}