
  let dialog = document.getElementById('dialog')
  let openbtn = document.getElementById('Advance Setting')
  let closebtn = document.getElementById('close')
  openbtn.onclick = ()=>{
    dialog.show()
    document.getElementById('imshow').style.border = '0px solid black transparent'
  }
  closebtn.onclick= ()=>{
    dialog.close()
    document.getElementById('imshow').style.background = 'linear-gradient(black, black) padding-box,linear-gradient(to right, red, blue) border-box' 
  }
  let inp = document.getElementById('inp') //user prompt
  let np = document.getElementById('np')   // negative pr3
  let gd = document.getElementById('gds')  // guidence_scale value 
  let step = document.getElementById('step')  // steps value 
  let seed = document.getElementById('seed')  // seed value 
  let seedp = document.getElementById('seedp')  // seed innerText 
  let stepp = document.getElementById('stepp')  // step innerText 
  let gdsp = document.getElementById('gdsp')  // guidence_scale innerText 
  let btn = document.getElementById('create') // Create button 
  let heightp = 1024  // height of photo 
  let widthp = 1024  // width of photo 
let cn = false
  gd.addEventListener('input',()=>{
   gdsp.innerText = gd.value
  })
  step.addEventListener('input',()=>{
   stepp.innerText = step.value
  })
  seed.addEventListener('input',()=>{
   seedp.innerText = seed.value
  })
  isFumes = true
  let prompt = 'CINEMATIC'
  let nps = ' ,(bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3),poorly drawn,deformed hands,deformed fingers,deformed faces,deformed eyes,mutated fingers,deformedbody parts,mutated body parts,mutated hands, disfigured,oversaturated,bad anatom,cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, deformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck,deformed eyes'
let reload = false
  
  document.getElementById('styles').onchange = ()=>{
    const selectedStyle = document.querySelector('input[name="style"]:checked');
    if(selectedStyle.value =='photo'){
      
      prompt = 'PHOTOGRAPHY'
    
    
    }
    if(selectedStyle.value == 'cinema'){
    
      prompt = "CINEMATIC"}
    if(selectedStyle.value == 'fantasy'){
   
      prompt = "CREATIVE"
    }

    if(selectedStyle.value == 'fumes'){
    
    prompt = 'FILM'
}


    if(selectedStyle.value == 'no'){
      prompt = 'LEONARDO'

    }
  }

  document.getElementById('ratio').onchange = ()=>{
    const selectedStyle = document.querySelector('input[name="ratio"]:checked');
    if(selectedStyle.value =='1:1'){
      
      widthp = 1024
      heightp = 1024
    
    
    }
    if(selectedStyle.value == '16:9'){
    
      widthp = 1024
      heightp = 576
    document.getElementById("img1").style.marginTop = "30%";

    }
    if(selectedStyle.value == '9:16'){
   
      widthp = 576
      heightp = 1024
    }



if(selectedStyle.value == '1:2'){
    
    widthp = 544
    heightp = 1088
}




    if(selectedStyle.value == '4:3'){
      widthp = 896
      heightp = 672
     
    }

  }



  btn.onclick = async () => {
    grecaptcha.ready(function () {
        grecaptcha.execute('6Leqa5cpAAAAABVhh6FGouusHKaPjYz65-0Yy8kS', { action: 'submit' }).then(async function (token) {
            if(cn == true){
              window.location.reload()
            }
            btn.innerText = "CANCEL";
            cn = true;
            let div = document.getElementById('imshow');
            
            
            
            
            div.innerHTML = '';
            document.getElementById('imshow').innerHTML = '';
            let pi = document.createElement('h5');
           
            
            
            let progress = document.createElement('progress');
            progress.value = 1;
            progress.max = 100;

            div.appendChild(progress);
            setInterval(() => {
                progress.value += 3;
            }, 1100);

            async function generate() {
                cookie = localStorage.getItem("cookie");
                u = localStorage.getItem("u");
                sub = localStorage.getItem("sub");
                if (cookie == null) {
                    cookie = '';
                }
                if (cookie == "undefined") {
                    cookie = '';
                }
                params = {
                    'prompt': inp.value,
                    'nprompt': np.value,
                    "steps": Number(step.value),
                    'guidenceScale': Number(gd.value),
                    "style": prompt,
                    "width": Number(widthp),
                    "height": Number(heightp),
                    "alchemy": true,
                    "pr": true,
                    token: token
                };

                try {
                    const response = await fetch('https://fumes-api.onrender.com/leonardo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Connection': 'keep-alive',
                        },
                        body: JSON.stringify(params)
                    });
                    if (response.status == 400) {
                        pi.innerText = 'reCaptcha human validation failed ⭕ user is suspected to be bot ';
                      div.append(pi)
                      alert('human verification failed ')
                      console.log(pi)
                    }

          cn = false
         btn.innerText = "CREATE" 
           const data = await response.json(); 
           localStorage.setItem("cookie", data.token);
           localStorage.setItem("sub", data.sub);
           localStorage.setItem("u", data.u);
           console.log(data.result)
         progress.innerHTML = ''
         progress.style.display = 'none';
           const img = document.createElement('img');
a = "1"
           img.id = "hehe"
           pi.innerHTML = ''
           pi.innerText = ''
           img.src = data.img[1];
         if(window.innerWidth<600){
           img.id = "img1"
         }
           div.appendChild(img);
           console.log(widthp.innerText)
          const img2 = document.createElement('img');
          img2.src = data.img[2];
           div.appendChild(img2);
           btn.disabled = false
           isimg = true
                } catch (error) {
                    btn.disabled = false;
                    console.error('An error occurred:', error);
                    pi.innerText = 'reCaptcha human verification failed ❌ user is suspected to be bot ';
                  pi.style.color = "white" 
                }
            }

            await Promise.all([generate()]);
        });
    });
};

