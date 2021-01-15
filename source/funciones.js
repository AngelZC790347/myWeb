class expert{
    constructor(location,description,fechIni,fechFn){
        this.Lugar=location;
        this.Description=description;
        this.Inio=fechIni;
        this.Fin=fechFn;
    }
}
const finalizaPrograma=()=>{
    let listSkills=new Array();
    var skillsElement=document.getElementsByClassName('output_skills');
    var srcImage=document.getElementById('img_perfil').src;
    if (srcImage==window.location.href) {
        srcImage=null;
    }
    if (skillsElement!=null){
        for (let index = 0; index < skillsElement.length; index++) {
            const element = skillsElement[index];
            let obj=new skills(element.innerHTML);
            listSkills[index]=obj;
        }
        localStorage.setItem("mySkills",JSON.stringify(listSkills));
    }
    localStorage.setItem("img_perfil",srcImage);
    window.location.assign("../cv.html");
}
const masUrl="https://www.flaticon.es/svg/static/icons/svg/37/37770.svg";
const menosUrl="https://www.flaticon.es/svg/static/icons/svg/32/32320.svg";
class skills{
    constructor(description){
        this.Description=description;   }
}
const agregaSkills=(stringValue,idParent)=>{
    if (stringValue!=""){
       let dt=document.createElement("dd");
       dt.className="skill";
       let liElement=document.createElement("li");
       let del=document.createElement("button");
       del.innerHTML="Eliminar";
       del.addEventListener("click",function(){
            dt.remove();
       });
       dt.appendChild(liElement);
       dt.appendChild(del);
       liElement.className="output_skills";
       liElement.innerHTML=stringValue;
       document.getElementById(idParent).appendChild(dt); 
    }
}
class user{
    constructor(name,lname,email,fech,phone) {
        this.usrName=name;
        this.usrLname=lname;
        this.usrEmail=email;
        this.usr_fech=fech;
        this.phone=phone;
    } 
    getAge(){
        return new Date().getFullYear-this.usr_fech;
    } 
}
function loadPaginas(){ 
}
const enterFormacion=(key,path)=>{
    var format=document.getElementsByClassName('formatArea');
    var sec_Info=document.getElementsByClassName("sec-info");
    var listFormation=new Array;
    if (format!=null) {
        let index_for=0;
        let index=0;
        while (index_for<sec_Info.length) {
            var obj=new expert(format[index].innerHTML,format[index+1].innerHTML,format[index+2].innerHTML,format[index+3].innerHTML);
            listFormation[index_for]=obj;
            index+=4;
            index_for++;
        }
        localStorage.setItem(key,JSON.stringify(listFormation));       
    }
    window.location.assign(path);
}
function enterUsers(className){
    let textField=document.getElementsByClassName(className);
    let anyVoid=false;
    for (let index = 0; index <textField.length; index++) {
        const element = textField[index];
        if (!element.value){
            anyVoid=true;
            alert("Es necesario llenar todos los campos");
            break;
        }
    }
    if(!anyVoid){
        var currentUser=new user(textField[0].value,textField[1].value,textField[2].value,textField[3].value,textField[4].value);
        var JsonUsr=JSON.stringify(currentUser);
        localStorage.setItem("myData",JsonUsr);
        window.location.assign("./tweets/tweets.html");
    }
}
const registerUser=()=>{
    var textField=document.getElementsByClassName("inputPost");
    let ban=true;
     for (let index = 0; index < textField.length; index++) {
         const element = textField[index];
         if(!element.value){ban=false;break;}
     }
     if (ban){
        var currentUser=new user(textField[0].value,textField[1].value,textField[2].value);
        let t=document.getElementById("regForm");
        t.src=null;
        t.style.height="0px";
     }else{
         alert("Rellene todos los campos");
     }
}
function mostrarImagen() {
    let el=document.getElementById('img_file');//add a modified File
    var files = el.files; 
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          var img = document.getElementById('img_perfil');
          img.src=e.target.result;
          img.className="thumb";
        };
      })(f);
      reader.readAsDataURL(f);
    }
}

const updatePage=(idLabel,idParent)=>{
    var textArea=document.getElementsByClassName(idLabel);
    let isVoid=true;
    for (let index = 0; index < textArea.length; index++) {
        if ((!textArea[index].value || textArea[index].value != textArea[index].defaultValue)&&textArea[index].value!="") {
            isVoid=false;
            break;
        }    
    }
    if (!isVoid){
        var  secField=document.createElement("blockquote");
        var globeText=document.createElement("ul");
        globeText.className="sec-info";
        var para=document.createElement("li");
        let comentText=document.createTextNode(""+textArea[3].value);
        para.appendChild(comentText);
        para.className='formatArea';
        globeText.appendChild(agregarDate(textArea[1].value));
        globeText.appendChild(para);
        globeText.appendChild(agregarDate(textArea[0].value));      
        globeText.appendChild(agregarDate(textArea[2].value)); 
        var padre=document.getElementById(idParent);
        let butLabel=document.createElement("button");   
        butLabel.innerHTML=textArea[3].value;
        butLabel.className="des-but";
        secField.appendChild(butLabel);
        secField.className="sec-field";
        secField.addEventListener("click",function(){
            if (globeText.style.display=="none"){
                globeText.style.display="block"
            }else{
                globeText.style.display="none";
            }
        });
        padre.appendChild(secField);
        padre.appendChild(globeText);
        let delButton=document.createElement("button");
        delButton.className="del-but";
        let equImg=document.createElement("img");
        equImg.src="https://cdn.icon-icons.com/icons2/692/PNG/512/seo-social-web-network-internet_322_icon-icons.com_61532.png";
        delButton.appendChild(equImg);
        delButton.addEventListener("click",function(){            
            globeText.remove();
            secField.remove();   
        });
        secField.appendChild(delButton);
        for (let index = 0; index < textArea.length; index++) {
            textArea[index].value=textArea[index].defaultValue;  
        }
    }
}
let agregarDate=(textDate)=>{
    let liElement=document.createElement("li");
    liElement.innerHTML=textDate;
    liElement.className="formatArea";
    return liElement;
}
const cargaInfo=()=>{
    var myObj=JSON.parse(localStorage.getItem('myData'));
    document.write(myObj);
    var infoSec=document.getElementById('info_sec');
}
const mostrarForm=(id)=>{
    var forEl=document.getElementById(id);
    let img=document.getElementById("icon");
    if (forEl.className=="form_sec"){
        img.src=menosUrl;
        forEl.className="displayed_form";
    }else{
        forEl.className="form_sec"
        img.src=masUrl;
    }
}
const actualizaPagina=(key)=>{
    let currentObj=JSON.parse(localStorage.getItem(key));
    if (currentObj!=null) {         
        for (const key in currentObj) {
            let element = currentObj[key];
            let  secField=document.createElement("blockquote");
            let globeText=document.createElement("ul");
            globeText.className="sec-info";
            secField.className="sec-field";
            let padre=document.getElementById('seccionEdu');
            padre.appendChild(secField);
            for (let key2 in element) {
                const element2 = element[key2];              
                globeText.appendChild(agregarDate(element2));
            }
            secField.addEventListener("click",function(){
                if (globeText.style.display=="none"){
                    globeText.style.display="block"
                }else{
                    globeText.style.display="none";
                }
            });
            let butLabel=document.createElement("button");   
            butLabel.innerHTML=element["Description"];
            butLabel.className="des-but";
            secField.appendChild(butLabel);
            padre.appendChild(secField);
            padre.appendChild(globeText);
            let delButton=document.createElement("button");
            delButton.className="del-but";
             let equImg=document.createElement("img");
            equImg.src="https://cdn.icon-icons.com/icons2/692/PNG/512/seo-social-web-network-internet_322_icon-icons.com_61532.png";
            delButton.appendChild(equImg);
            delButton.addEventListener("click",function(){            
                globeText.remove();
                secField.remove();   
            });
            secField.appendChild(delButton);
        }
    }
}    
function actualizaUserForm(){
    let fieldEl=document.getElementsByClassName("inputField");
    let myObj=JSON.parse(localStorage.getItem("myData"));
    let i=0;
    for (const key in myObj){
        fieldEl[i].value=myObj[key];
        i++;
    }      
}
function actualizaStep4(){
    let myObj=JSON.parse(localStorage.getItem("mySkills"));
    for (const key in myObj) {
        const element=myObj[key];
        for (const key2 in element) {
            agregaSkills(element[key2],'list_skills');
        }
    }
    let string_img=localStorage.getItem("img_perfil");
    document.getElementById("img_perfil").src=string_img;
    document.getElementById("img_perfil").className="thumb";
}
