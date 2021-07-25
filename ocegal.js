
const d = new Date();
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
        const tElemID = minha ? 'tahanun' : 'no__tahanun';
        const tElemTxt = minha  
                        ? "We recite ta&#7717anun today as usual"
                        : "We do not recite ta&#7717anun this afternoon";
        document.getElementById( tElemID ).textContent = tElemTxt;
    }
    catch (err) {
        console.error(`ocegal: unexpected error: "${err}"`)
    };
}