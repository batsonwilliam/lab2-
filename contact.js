let firebaseConfig = {
    apiKey: "AIzaSyApyabxgzNubEjn5Cuo_RtC3FoLdJn8iZA",
    authDomain: "localhost",
    projectId: "lab5-ec958",
};


firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// let db = firebase.firestore();

let m=0.00,f=0.00,o=0.00,sum=0.00;


let ra = document.getElementsByName('gender');
let b = false;

let email = document.getElementById('email');
//let email=document.myForm.Email.value;
let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let mailreg=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;


$('#sub').click(()=>{
    if(validation()===false){
        return;
    }
    else{
   // console.log($('#subject').val())
    db.collection("users").add({
        name:$('#name').val(),
        surname:$('#sname').val(),
        gender:Number($('input[name="gender"]:checked').val()),
        email:$('#email').val(),
        description:$('#text').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('#name').val('');
        $('#sname').val('');
        $('#email').val('');
        $('#text').val('');
        ra[0].checked=true;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }
})

$('#res').click(()=>{
    $('#name').val('');
    $('#sname').val('');
    $('#email').val('');
    $('#text').val('');
    ra[0].checked=true;
})

function validation(){
    if($('#name').val()===null||$('#name').val()===''){
        alert("please enter a name");
        document.myForm.Name.focus();
        return false;
    } 
    if($('#sname').val()===null||$('#sname').val()===''){
        alert("please enter a surname");
        document.myForm.sName.focus();
        return false;
    }     
    if($('#email').val().indexOf('@')<=1||($('#email').val().lastIndexOf('.')-$('#email').val().indexOf('@'))<=2||$('#email').val()===''){
        alert('Please enter valid Email');
        document.myForm.Email.focus();
        return false;
    }
}





db.collection("users").orderBy("name").onSnapshot(doc=>{
    let table = $('tbody')[0];
    //document.querySelectorAll("tbody tr").forEach(item=>item.remove());
    $("tbody tr").remove()
    doc.forEach(item=>{
        let st=(item.data().name)+' '+(item.data().surname)
        
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        
        firstCell.textContent=st;
        
        if(item.data().gender==1){
            secondCell.textContent="Male";
            m++;
        }
        if(item.data().gender==2){
            secondCell.textContent="Female";
            f++;
        }
        if(item.data().gender==3){
            secondCell.textContent="Other";
            o++;
        }
        let str = String(item.data().email);
        let buff="";
        for(i=0;i<str.length;i++){
            if(i===0||str[i]==="@"||str[i]==="."){
                buff+=str[i];
            }
            else buff+="x";
        }
        console.log(str);
        sum=m+f+o;
        thirdCell.textContent=buff;

        let options = {
            title: {
                text: "Gender Percentage"
            },
            subtitles: [{
                text: ""
            }],
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: (m/sum)*100, label: "Male" },
                    { y: (f/sum)*100, label: "Female" },
                    { y: (o/sum)*100, label: "Other" },
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(options);  
    })

})