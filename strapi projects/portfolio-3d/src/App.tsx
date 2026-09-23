import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  Text,
  Stars
} from "@react-three/drei";

import {
  EffectComposer,
  Bloom
} from "@react-three/postprocessing";

import { motion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";



/* =========================
   3D CORE OBJECT
========================= */


function CoreObject(){

  const ref = useRef<THREE.Mesh>(null);


  useFrame((state)=>{

    if(!ref.current) return;


    ref.current.rotation.x =
      state.clock.elapsedTime * 0.2;


    ref.current.rotation.y =
      state.clock.elapsedTime * 0.35;


  });


  return (

    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
    >

      <mesh ref={ref}>


        <octahedronGeometry
          args={[1.4,4]}
        />


        <meshStandardMaterial

          color="#00ffff"

          emissive="#0066ff"

          emissiveIntensity={2}

          metalness={1}

          roughness={0.15}

        />


      </mesh>


    </Float>

  );

}




/* =========================
   PARTICLE FIELD
========================= */


function ParticleField(){


const ref =
useRef<THREE.Points>(null);



const positions =
new Float32Array(
1500 * 3
);



for(let i=0;i<1500;i++){

positions[i*3]
=
(Math.random()-0.5)*30;


positions[i*3+1]
=
(Math.random()-0.5)*30;


positions[i*3+2]
=
(Math.random()-0.5)*30;

}



useFrame(()=>{


if(ref.current){

ref.current.rotation.y +=0.0005;

}


});



return (

<points ref={ref}>


<bufferGeometry>

<bufferAttribute

attach="attributes-position"

count={1500}

array={positions}

itemSize={3}

/>


</bufferGeometry>



<pointsMaterial

size={0.025}

color="#4ddcff"

/>



</points>


);


}




/* =========================
   3D HERO
========================= */


function Scene(){


return (

<Canvas

camera={{
position:[0,0,7],
fov:45
}}

>


<color

attach="background"

args={[
"#020617"
]}

/>



<ambientLight
intensity={0.5}
/>



<pointLight

position={[4,4,4]}

color="#00ffff"

intensity={8}

/>



<pointLight

position={[-4,-2,-4]}

color="#6366f1"

intensity={6}

/>



<ParticleField/>


<CoreObject/>



<Text

position={[0,-2.4,0]}

fontSize={0.3}

color="white"

>

AI ENGINEER

</Text>




<Environment preset="city"/>



<Stars
radius={50}
depth={50}
/>



<EffectComposer>


<Bloom

intensity={1.5}

luminanceThreshold={0}

mipmapBlur

/>


</EffectComposer>



<OrbitControls

enableZoom={false}

/>


</Canvas>


);


}






export default function App(){


return (

<div className="
bg-[#020617]
text-white
overflow-hidden
">


{/* HERO */}

<section className="
h-screen
relative
">


<div className="
absolute
inset-0
">


<Scene/>


</div>




<motion.div

initial={{
opacity:0,
y:60
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:1.2
}}

className="
relative
z-10
h-full
flex
items-center
justify-center
text-center
px-6
"


>


<div>


<p className="
text-cyan-400
tracking-[0.5em]
uppercase
mb-6
">

Full Stack Developer

</p>



<h1 className="
text-6xl
md:text-8xl
font-black
leading-tight
">

ANOSH
<br/>

<span className="
bg-gradient-to-r
from-cyan-400
to-indigo-500
bg-clip-text
text-transparent
">

RAJBAKSHA

</span>


</h1>



<p className="
mt-8
text-xl
text-gray-400
max-w-xl
">

Building scalable web applications,
AI systems and cloud solutions.

</p>



<div className="
flex
gap-5
justify-center
mt-10
">


<button className="
px-8
py-4
rounded-full
bg-cyan-400
text-black
font-bold
">

View Work

</button>


<button className="
px-8
py-4
rounded-full
border
border-white/20
backdrop-blur
">

Contact

</button>


</div>


</div>


</motion.div>


</section>

{/* =========================
      ABOUT SECTION
========================= */}

<section className="
min-h-screen
flex
items-center
justify-center
px-8
py-32
">


<motion.div

initial={{
opacity:0,
y:50
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:0.8
}}

viewport={{
once:true
}}

className="
max-w-5xl
text-center
"


>


<p className="
text-cyan-400
uppercase
tracking-[0.4em]
mb-5
">

About Me

</p>



<h2 className="
text-5xl
md:text-6xl
font-bold
">

Building Digital
Experiences With Code

</h2>



<p className="
mt-8
text-xl
text-gray-400
leading-relaxed
">

I specialize in creating modern full-stack
applications, AI-powered solutions and cloud
architectures. My focus is transforming ideas
into scalable digital products.

</p>


</motion.div>


</section>






{/* =========================
      SKILLS
========================= */}


<section className="
min-h-screen
px-8
py-32
">


<h2 className="
text-center
text-5xl
font-bold
mb-20
">

Technology Stack

</h2>



<div className="
grid
md:grid-cols-4
gap-8
max-w-6xl
mx-auto
">


{
[
"React",
"TypeScript",
"FastAPI",
"Python",
"AWS",
"Docker",
"Kubernetes",
"AI / LLM"
]
.map((item,index)=>(


<motion.div


initial={{
opacity:0,
scale:0.8
}}


whileInView={{
opacity:1,
scale:1
}}


transition={{
delay:index*0.1
}}


whileHover={{
scale:1.08,
rotateY:10
}}



key={item}


className="
h-40
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
flex
items-center
justify-center
text-xl
font-semibold
shadow-xl
"


>


{item}


</motion.div>


))

}


</div>


</section>







{/* =========================
      PROJECTS
========================= */}



<section className="
min-h-screen
px-8
py-32
">


<p className="
text-center
text-cyan-400
tracking-[0.4em]
uppercase
">

Featured Work

</p>


<h2 className="
text-center
text-5xl
font-bold
mt-5
mb-20
">

Projects

</h2>




<div className="
max-w-6xl
mx-auto
grid
md:grid-cols-3
gap-10
">



{

[
{
title:"AI Knowledge Assistant",
tech:"React • FastAPI • LLM",
desc:"Document intelligence platform with AI search."
},

{
title:"Business SaaS",
tech:"React • Node • Cloud",
desc:"Enterprise management platform."
},

{
title:"3D Portfolio",
tech:"Three.js • WebGL",
desc:"Interactive developer experience."
}

]

.map((project)=>(


<motion.div


whileHover={{
y:-20
}}


key={project.title}


className="
rounded-3xl
p-8
bg-gradient-to-br
from-cyan-500/20
to-indigo-600/20
border
border-white/10
backdrop-blur-xl
"


>



<div className="
h-48
rounded-2xl
bg-black/40
mb-6
flex
items-center
justify-center
text-cyan-400
text-5xl
">

◈

</div>



<h3 className="
text-2xl
font-bold
">

{project.title}

</h3>



<p className="
mt-3
text-cyan-300
">

{project.tech}

</p>



<p className="
mt-5
text-gray-400
">

{project.desc}

</p>



</motion.div>


))


}


</div>


</section>







{/* =========================
      EXPERIENCE
========================= */}



<section className="
min-h-screen
px-8
py-32
">


<h2 className="
text-center
text-5xl
font-bold
mb-20
">

Experience Journey

</h2>



<div className="
max-w-3xl
mx-auto
space-y-10
">


{

[
"Frontend Engineering",
"Backend API Development",
"Cloud Infrastructure",
"AI Application Development"
]

.map((item,index)=>(


<motion.div


initial={{
opacity:0,
x:-50
}}


whileInView={{
opacity:1,
x:0
}}


transition={{
delay:index*0.15
}}



key={item}


className="
flex
gap-8
items-center
"


>


<div className="
w-14
h-14
rounded-full
bg-cyan-400
text-black
flex
items-center
justify-center
font-bold
">

0{index+1}

</div>



<h3 className="
text-2xl
">

{item}

</h3>



</motion.div>


))


}


</div>


</section>






{/* =========================
      CONTACT
========================= */}



<section className="
h-screen
flex
items-center
justify-center
px-8
text-center
">


<div>


<p className="
text-cyan-400
tracking-[0.5em]
uppercase
">

Contact

</p>



<h2 className="
text-6xl
font-black
mt-8
">

Let's Build
Something Amazing

</h2>



<p className="
text-gray-400
text-xl
mt-8
">

Available for Web, AI and Cloud projects.

</p>



<button className="
mt-10
px-12
py-5
rounded-full
bg-gradient-to-r
from-cyan-400
to-indigo-500
text-black
font-bold
">

Start A Project

</button>


</div>


</section>



</div>

);

}