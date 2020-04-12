document.addEventListener("DOMContentLoaded", Isload, false);
 
var TheTime ;

function Isload(e) {
	
    var Btnstart = document.getElementById('start');
    var Btnstop = document.getElementById('stop');
    var Btnsort = document.getElementById('sort');

    Btnstart.onclick = function(e) {     
        e.stopImmediatePropagation();
        Btnstart.disabled = true;

        TheTime = setInterval(Data, 1000);

        function Data() {
            var Lachdata = lachhab(TABLE_DATA);   
            loadData(Lachdata);
        }
    };

    Btnstop.onclick = function(e) {
        Btnstart.disabled = false;
        clearInterval(TheTime);        
    };

    Btnsort.onclick = function() {
        var DataSorted = TABLE_DATA.sortAscBy("id");
        var DataSorted = DataSorted.sortDescBy("price");        
        loadData(DataSorted);
    };
}

function loadData(data) {
    var Table = document.getElementsByClassName("table")[0].getElementsByTagName('tbody')[0];

    while(Table.hasChildNodes())
    {
        Table.removeChild(Table.firstChild);
    }
    const Datalenght = TABLE_DATA.length;

    for (var i = 0; i < Datalenght; i++) {
        var newRow   = Table.insertRow(Table.rows.length);
        var cellId  = newRow.insertCell(0);
        var cellImage = newRow.insertCell(1);
        var cellName  = newRow.insertCell(2);
        var cellPrice  = newRow.insertCell(3);        

        var DOM_img = document.createElement("img");
        DOM_img.src = data[i].thumbnailUrl;

        var id  = document.createTextNode(data[i].id);
        var name  = document.createTextNode(data[i].name);
        var price  = document.createTextNode(data[i].price);

        cellId.appendChild(id);
        cellImage.appendChild(DOM_img);
        cellName.appendChild(name);
        cellPrice.appendChild(price);
    }
}

Array.prototype.sortAscBy = function(p) {
    return this.slice(0).sort(function(a, b) {
        var x = parseInt(a[p]);
        var y = parseInt(b[p]);

        if (x > y) {
            return 1;
        } else if(x < y) {
            return -1
        } else if (x==y) {
            return 0;
        }
        
    });
}
Array.prototype.sortDescBy = function(p) {
    return this.slice(0).sort(function(a, b) {
        var x = parseInt(a[p]);
        var y = parseInt(b[p]);

        if (x > y) {
            return -1;
        } else if(x < y) {
            return 1
        } else if (x==y) {
            return 0;
        }
        
    });
}

function lachhab(array) {
    var counter = array.length;

    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);

        counter--;

        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}