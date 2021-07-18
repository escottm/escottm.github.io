
function tahnun_today() {
    const hdate = 
    {
        day: document.getElementById('heb__date').innerHTML,
        month: document.getElementById('heb__month').innerHTML
    }

    switch (hdate) {
        case {day: '8', month: 'Av'}:
        case {day: '9', month: 'Av'}:
            return false;
        default:
            return true;
    }
}

document.getElementById('tahnun').innerHTML = 
    tahnun_today()
    ? 'We recite ta&#7717nun today'
    : 'NO TA&#7716NUN TODAY';

