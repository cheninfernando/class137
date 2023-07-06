status="";
objects=[];

function setup(){
    canvas=createCanvas( 480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector("cocossd", modelloaded);
document.getElementById("status").innerHTML="Status : Detecting Objects";
input=document.getElementById("object").value;
}

function modelloaded(){
    console.log("modelloaded")
    status=true;
}

function draw(){
    image(video,0,0,480,380);
     if(status != ""){
        objectDetector.detect(video,gotResults);

        for( i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("numberofobjects").innerHTML= " Number of Objects Detected are :" +objects.length;

            fill("yellow");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("yellow");
            rect( objects[i].x, objects[i].y, objects[i].width,objects[i].height);
            if(objects[i].label==input){
                document.getElementById("status").innerHTML="Status: Object Mentioned Found";
                var synth= window.speechSynthesis;
                var speekdata="Object Mentioned Found: " + objects[i].label;
                var utterthis= new SpeechSynthesisUtterance(speekdata);
                synth.speak(utterthis);
 
            }
        }
    } 
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results)
    objects=results;
}

