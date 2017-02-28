/**
 * Created by Sharvilak on 26-02-2017.
 */


$(document).on('change','.progresstxtbox',function(){

    var txtboxes = document.getElementById('firstclass').getElementsByTagName('input');
    var txtarea = document.getElementById('firstclass').getElementsByTagName('textarea');
    var count = txtboxes.length+txtarea.length;
    console.log(count);
    var fill_count=0;

    for(var i=0;i<txtboxes.length;i++)
    {
        if(txtboxes[i].value!='')
        {
            fill_count++;
        }
    }
    for(var j=0;j<txtarea.length;j++)
    {
        if(txtarea[j].value!='')
        {
            fill_count++;
        }
    }
    console.log(fill_count);

    var pbar = document.getElementById('progress-bar');

    var percent = parseInt((fill_count/count)*100);
    //console.log(percent);
    pbar.setAttribute('aria-valuenow',toString(percent));
    pbar.innerHTML=percent+" % Complete";
    pbar.style.width=percent+'%';

});

$(document).on('keyup','#description',function () {

    var remaining = 200-this.value.length;
    var lblchar = document.getElementById('chars');
    if ( remaining > 0 ) {
        lblchar.style.color="green";
        lblchar.innerText = remaining+" characters remaining...";
    }
    else {
        lblchar.style.color="red";
        lblchar.innerText = remaining;
    }
});

$(document).on('change','#dateofbirth',function(){

    var dt=this.value.split("/");
    var dt1 = new Date(parseInt(dt[2]),parseInt(dt[0])-1,parseInt(dt[1]));
    //console.log(dt1);
    if((dt1)){
        var age = document.getElementById('age');
        var today = new Date();
        var age_num= parseInt(parseInt(today.getFullYear()-dt1.getFullYear()));

        if(!isNaN(age_num))
        age.value = age_num;
    }
});

$(document).ready(function(){
    var date_input=$('input[name="dateofbirth"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: 'mm/dd/yyyy',
        container: container,
        startView: 'year',
        todayHighlight: true,
        autoclose: true
    });


});

$(document).on('keyup','#firstname',function(){

    if(this.value!='') {
        document.getElementById('search').classList.remove('disabled');
        document.getElementById('search').removeAttribute('disabled');
    }
    else {
        document.getElementById('search').classList.add('disabled');
        document.getElementById('search').setAttribute('disabled','disabled');
    }
});

