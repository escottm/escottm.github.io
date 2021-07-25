
const d = new Date();
const API = `http://localhost:8080?date=${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

const tahanun = fetch( API )
    .then( res => (await res.json()) )
    .then( json => distTahanunInfo(json))
    .catch( err => console.error(`ocegal: fetch() failed with "${err}"`));

function distTahanunInfo( t ) {
    console.log(t);
    try {
        document.getElementById('full__date').textContent =`${t.hm}-${t.hd}-${t.hy}`;
    }
    catch (err) {
        console.error(`ocegal: unexpected error: "${err}"`)
    };
}