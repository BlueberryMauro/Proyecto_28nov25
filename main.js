console.log("Main.js cargado correctamente")

const btnCargar=document.getElementById("btn-cargar")
const btnEjecutar=document.getElementById("btn-ejecutar")
const txtMatriz=document.getElementById("matriz_input")
const salida=document.getElementById("resultado")
const canvas=document.getElementById("lienzo")
const ctx=canvas.getContext("2d")
const chkDirigido=document.getElementById("check-dirigido")
const chkPonderado=document.getElementById("check-ponderado")

const toggleBtn=document.getElementById("toggle-console-btn")
const closeBtn=document.getElementById("close-console-btn")
const drawer=document.getElementById("console-drawer")
const overlay=document.getElementById("console-overlay")

setTimeout(()=>{
    if(window.LocomotiveScroll){
        const scroll=new LocomotiveScroll({el:document.querySelector('[data-scroll-container]'),smooth:true,multiplier:0.8})
        new ResizeObserver(()=>scroll.update()).observe(document.querySelector('.main-container'))
    }
},100)

function openConsole(){drawer.classList.add('is-open');overlay.classList.add('is-active')}
function closeConsole(){drawer.classList.remove('is-open');overlay.classList.remove('is-active')}

toggleBtn.addEventListener('click',openConsole)
closeBtn.addEventListener('click',closeConsole)
overlay.addEventListener('click',closeConsole)

let nodos=[]
let dragging=null
let mouse={x:0,y:0}

const audioCtx=new (window.AudioContext||window.webkitAudioContext)()
const osc=audioCtx.createOscillator()
osc.type="sine"
osc.frequency.value=40
const gain=audioCtx.createGain()
gain.gain.value=0
osc.connect(gain)
gain.connect(audioCtx.destination)
osc.start()

btnCargar.addEventListener('click',()=>{
    const txt=txtMatriz.value.trim()
    if(!txt){alert("Inserta una matriz primero");return}
    const matriz=txt.split("\n").map(r=>r.trim().split(/\s+/).map(Number))
    window.grafo=matriz
    window.esDirigido=chkDirigido.checked
    window.esPonderado=chkPonderado.checked
    salida.textContent=`Grafo cargado (Dirigido: ${window.esDirigido}, Ponderado: ${window.esPonderado}):\n`+JSON.stringify(matriz,null,2)
    dibujarGrafo(matriz,window.esDirigido,window.esPonderado)
})

function dibujarGrafo(matriz,dirigido,ponderado){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    const n=matriz.length
    if(n===0)return

    if(nodos.length!==n){
        nodos=[]
        const cx=canvas.width/2
        const cy=canvas.height/2
        const r=150
        const step=(2*Math.PI)/n
        for(let i=0;i<n;i++){
            const a=i*step-Math.PI/2
            nodos.push({x:cx+r*Math.cos(a),y:cy+r*Math.sin(a),vx:0,vy:0,id:i,lx:cx,ly:cy})
        }
    }

    ctx.lineWidth=1.8
    ctx.strokeStyle="rgba(139,148,158,0.4)"

    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            if(matriz[i][j]!==0){
                if(!dirigido&&i>j)continue
                let a=nodos[i]
                let b=nodos[j]
                if(dirigido)dibujarFlecha(ctx,a.x,a.y,b.x,b.y,20)
                else{
                    ctx.beginPath()
                    ctx.moveTo(a.x,a.y)
                    ctx.lineTo(b.x,b.y)
                    ctx.stroke()
                }
                if(ponderado){
                    const mx=(a.x+b.x)/2
                    const my=(a.y+b.y)/2
                    ctx.fillStyle="#0d1117"
                    ctx.fillRect(mx-8,my-8,16,16)
                    ctx.fillStyle="#58a6ff"
                    ctx.font="12px monospace"
                    ctx.textAlign="center"
                    ctx.textBaseline="middle"
                    ctx.fillText(matriz[i][j],mx,my)
                }
            }
        }
    }

    for(let n1 of nodos){
        ctx.beginPath()
        ctx.arc(n1.x,n1.y,20,0,2*Math.PI)
        ctx.fillStyle="#21262d"
        ctx.fill()
        ctx.strokeStyle="#30363d"
        ctx.lineWidth=2
        ctx.stroke()
        ctx.fillStyle="#c9d1d9"
        ctx.font="bold 16px Arial"
        ctx.textAlign="center"
        ctx.textBaseline="middle"
        ctx.fillText(n1.id,n1.x,n1.y)
    }
}

function dibujarFlecha(ctx,fx,fy,tx,ty,r){
    const h=10
    const ang=Math.atan2(ty-fy,tx-fx)
    const ex=tx-r*Math.cos(ang)
    const ey=ty-r*Math.sin(ang)
    const sx=fx+r*Math.cos(ang)
    const sy=fy+r*Math.sin(ang)
    ctx.beginPath()
    ctx.moveTo(sx,sy)
    ctx.lineTo(ex,ey)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ex,ey)
    ctx.lineTo(ex-h*Math.cos(ang-Math.PI/6),ey-h*Math.sin(ang-Math.PI/6))
    ctx.lineTo(ex-h*Math.cos(ang+Math.PI/6),ey-h*Math.sin(ang+Math.PI/6))
    ctx.lineTo(ex,ey)
    ctx.fillStyle=ctx.strokeStyle
    ctx.fill()
}

canvas.addEventListener("mousedown",e=>{
    audioCtx.resume()
    const rect = canvas.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;

    for(let n1 of nodos){
        if(Math.hypot(mx-n1.x,my-n1.y)<=20){
            dragging=n1
            break
        }
    }
})

document.addEventListener("mouseup",()=>{
    if(dragging){
    }
    dragging=null
})

document.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

function loop(){
    if(dragging){
        let targetX = Math.max(20, Math.min(canvas.width - 20, mouse.x));
        let targetY = Math.max(20, Math.min(canvas.height - 20, mouse.y));
        
        dragging.x += (targetX - dragging.x) * 0.15;
        dragging.y += (targetY - dragging.y) * 0.15;
        dragging.vx = dragging.x - dragging.lx;
        dragging.vy = dragging.y - dragging.ly;
    }

    for(let i=0; i<nodos.length; i++){
        for(let j=i+1; j<nodos.length; j++){
            let n1 = nodos[i];
            let n2 = nodos[j];
            
            let dx = n2.x - n1.x;
            let dy = n2.y - n1.y;
            let dist = Math.hypot(dx, dy);
            
            if(dist < 40){
                let angle = Math.atan2(dy, dx);
                let tx = Math.cos(angle);
                let ty = Math.sin(angle);
                let overlap = 40 - dist;
                
                n1.x -= tx * overlap * 0.5;
                n1.y -= ty * overlap * 0.5;
                n2.x += tx * overlap * 0.5;
                n2.y += ty * overlap * 0.5;

                let k = 0.5; 
                let vx = n2.vx - n1.vx;
                let vy = n2.vy - n1.vy;
                let dp = vx * tx + vy * ty;
                
                if (dp < 0) {
                    let impulse = dp * (1 + k) * 0.5;
                    n1.vx += tx * impulse;
                    n1.vy += ty * impulse;
                    n2.vx -= tx * impulse;
                    n2.vy -= ty * impulse;
                }
            }
        }
    }

    for(let n1 of nodos){
        if(n1!==dragging){
            n1.x+=n1.vx
            n1.y+=n1.vy

            if(n1.x<20){
                n1.x=20
                n1.vx*=-1
            }
            if(n1.x>canvas.width-20){
                n1.x=canvas.width-20
                n1.vx*=-1
            }
            if(n1.y<20){
                n1.y=20
                n1.vy*=-1
            }
            if(n1.y>canvas.height-20){
                n1.y=canvas.height-20
                n1.vy*=-1
            }

            n1.vx*=0.92
            n1.vy*=0.92
        }

        n1.lx=n1.x
        n1.ly=n1.y
    }

    const vel=dragging?Math.hypot(dragging.vx,dragging.vy):0
    let vol=Math.min(vel*0.06,1)*0.08
    gain.gain.setTargetAtTime(vel>0.1?vol:0,audioCtx.currentTime,0.04)
    let fr=40+vel*6
    osc.frequency.setTargetAtTime(fr,audioCtx.currentTime,0.04)

    if(window.grafo)dibujarGrafo(window.grafo,window.esDirigido,window.esPonderado)

    requestAnimationFrame(loop)
}

loop()

btnEjecutar.addEventListener('click',()=>{
    const op=document.getElementById("select-algoritmo").value
    let ok=false
    if(op=="1"&&typeof ejecutarBFS=="function"){ejecutarBFS();ok=true}
    if(op=="2"&&typeof ejecutarDFS=="function"){ejecutarDFS();ok=true}
    if(op=="3"&&typeof ejecutarDijkstra=="function"){ejecutarDijkstra();ok=true}
    if(op=="4"&&typeof ejecutarBipartito=="function"){ejecutarBipartito();ok=true}
    if(op=="5"&&typeof ejecutarMatching=="function"){ejecutarMatching();ok=true}
    if(op=="6"&&typeof ejecutarBellman=="function"){ejecutarBellman();ok=true}
    if(op=="7"&&typeof ejecutarFloyd=="function"){ejecutarFloyd();ok=true}
    if(op=="8"&&typeof ejecutarPrim=="function"){ejecutarPrim();ok=true}
    if(op=="9"&&typeof ejecutarKruskal=="function"){ejecutarKruskal();ok=true}
    if(ok)openConsole()
})