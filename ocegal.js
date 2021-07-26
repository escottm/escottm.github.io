
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

function distTahanunInfo( t ) {
    console.log(t);
    try {
        document.getElementById('full__date').textContent =`${t.hd} ${t.hm} ${t.hy}`;
        const minha = found( t.services, 'minha');
        const reciteAtMinha = (t.tahanun && minha) || ( !t.tahanun && !minha );
        const tElemClass = minha ? 'recite' : 'omit';
        const tElemTxt = minha  
                        ? "We recite taḥanun today as usual"
                        : "We do not recite taḥanun this afternoon";
        const tahanunElem = document.getElementById( 'tahanun' );
        tahanunElem.classList.add( tElemClass); // allow for different styling for recite/omit messages
        tahanunElem.textContent = tElemTxt;
    }
    catch (err) {
        console.error(`ocegal: unexpected error: "${err}"`)
    };
    
}