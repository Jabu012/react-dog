import React, { useEffect, useRef, useLayoutEffect, useMemo } from 'react'
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const Dog = () => {





    const model = useGLTF("/models/dog.drc.glb")



    const { actions } = useAnimations(model.animations, model.scene)

    useEffect(() => {
        actions[ "Take 001" ].play()
    }, [ actions ])



    const [ normalMap ] = (useTexture([ "/dog_normals.jpg", ]))
        .map(texture => {
            texture.flipY = false
            texture.colorSpace = THREE.SRGBColorSpace
            return texture
        })

    const [ branchMap, branchNormalMap ] = (useTexture([ "/branches_diffuse.jpeg", "/branches_normals.jpeg" ]))
        .map(texture => {
            texture.colorSpace = THREE.SRGBColorSpace
            return texture
        })

    const [
        mat1,
        mat2,
        mat3,
        mat4,
        mat5,
        mat6,
        mat7,
        mat8,
        mat9,
        mat10,
        mat11,
        mat19
    ] = (useTexture([
        "/matcap/mat-1.png",
        "/matcap/mat-2.png",
        "/matcap/mat-3.png",
        "/matcap/mat-4.png",
        "/matcap/mat-5.png",
        "/matcap/mat-6.png",
        "/matcap/mat-7.png",
        "/matcap/mat-8.png",
        "/matcap/mat-9.png",
        "/matcap/mat-10.png",
        "/matcap/mat-11.png",
        "/matcap/mat-19.png",
    ])).map(texture => {
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const material = useRef({
        uMatcap1: { value: mat2 },
        uMatcap2: { value: mat19 },
        uProgress: { value: 1.0 }
    })

    const branchMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        map: branchMap,
        normalMap: branchNormalMap,
        roughness: 0.8,
        metalness: 0.2
    }), [branchMap, branchNormalMap])

    const dogMaterial = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            normalMap: normalMap,
            matcap: mat2
        })
        mat.onBeforeCompile = (shader) => {
            shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
            shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
            shader.uniforms.uProgress = material.current.uProgress

            shader.fragmentShader = shader.fragmentShader.replace(
                "void main() {",
                `
                uniform sampler2D uMatcapTexture1;
                uniform sampler2D uMatcapTexture2;
                uniform float uProgress;
                void main() {
                `
            )

            shader.fragmentShader = shader.fragmentShader.replace(
                "vec4 matcapColor = texture2D( matcap, uv );",
                `
                vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
                vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
                float transitionFactor  = 0.2;
                float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);
                vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
                `
            )
        }
        return mat
    }, [normalMap, mat2])

    useLayoutEffect(() => {
        model.scene.traverse((child) => {
            if (child.name.includes("DOG")) {
                child.material = dogMaterial
            } else {
                child.material = branchMaterial
            }
        })
    }, [model.scene, dogMaterial, branchMaterial])

const dogModel = useRef()
const rotationGroup = useRef()

    useFrame((state, delta) => {
        if (rotationGroup.current) {
            rotationGroup.current.rotation.y += delta * 0.12 // Slow constant spin
            rotationGroup.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05 // Subtle float
        }
    })


    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-6",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        })

        tl
            // Section 1 to 2: Move left to avoid right-aligned mission text
            .to(dogModel.current.position, {
                x: "-=0.45",
                z: "+=0.1",
                y: "+=0.1"
            })
            .to(dogModel.current.rotation, {
                y: `+=${Math.PI / 4}`,
                z: "-=0.3"
            }, "<")

            // Section 2 to 3: Move right to avoid left-aligned portfolio titles
            .to(dogModel.current.position, {
                x: "+=0.5",
                z: "+=0.15",
                y: "-=0.1"
            })
            .to(dogModel.current.rotation, {
                y: `-=${Math.PI / 2}`,
                x: `+=${Math.PI / 10}`
            }, "<")

            // Section 3 to 4: Move far right to avoid centered quote
            .to(dogModel.current.position, {
                x: "+=0.1",
                z: "-=0.1",
                y: "+=0.05"
            })
            .to(dogModel.current.rotation, {
                z: `-=${Math.PI / 8}`
            }, "<")

            // Section 4 to 5 (Technical Foundation)
            .to(dogModel.current.position, {
                x: "+=0.05",
                z: "+=0.15",
                y: "-=0.05"
            })
            .to(dogModel.current.rotation, {
                y: `+=${Math.PI / 3}`
            }, "<")

            // Section 5 to 5b (Strategy)
            .to(dogModel.current.position, {
                x: "+=0.1",
                z: "-=0.1"
            })
            .to(dogModel.current.rotation, {
                z: `+=${Math.PI / 10}`
            }, "<")

            // Section 5b to 6 (Contact)
            .to(dogModel.current.position, {
                x: "-=0.1",
                z: "+=0.15"
            })
            .to(dogModel.current.rotation, {
                y: `-=${Math.PI / 4}`,
                x: `-=${Math.PI / 8}`
            }, "<")

        // Scroll-Triggered Color Transitions
        const sections = [
            { id: "#section-1", mat: mat2 },
            { id: "#section-2", mat: mat19 },
            { id: "#section-4", mat: mat5 },
            { id: "#section-5", mat: mat11 },
            { id: "#section-strategy", mat: mat8 },
            { id: "#section-6", mat: mat9 }
        ]

        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: section.id,
                start: "top center",
                onEnter: () => {
                    material.current.uMatcap1.value = section.mat
                    gsap.to(material.current.uProgress, {
                        value: 0.0,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete: () => {
                            material.current.uMatcap2.value = material.current.uMatcap1.value
                            material.current.uProgress.value = 1.0
                        }
                    })
                },
                onEnterBack: () => {
                    material.current.uMatcap1.value = section.mat
                    gsap.to(material.current.uProgress, {
                        value: 0.0,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete: () => {
                            material.current.uMatcap2.value = material.current.uMatcap1.value
                            material.current.uProgress.value = 1.0
                        }
                    })
                }
            })
        })

    }, [mat2, mat5, mat9, mat11, mat19])

    useEffect(() => {
        const matcapsMap = {
            "background-l": mat1,
            "branches_diffuse": mat2,
            "branches_normals": mat3,
            "dog_normals": mat4,
            "kennedy": mat5,
            "kikk": mat6,
            "msi-chicago": mat7,
            "navy-pier": mat8,
            "opera": mat9,
            "phone": mat10
        }

        const handleMouseEnter = (e) => {
            const title = e.currentTarget.getAttribute("img-title")
            const newMatcap = matcapsMap[title] || mat11

            material.current.uMatcap1.value = newMatcap
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        }

        const handleMouseLeave = () => {
            material.current.uMatcap1.value = mat2
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        }

        const titles = document.querySelectorAll('.title')
        titles.forEach(t => t.addEventListener('mouseenter', handleMouseEnter))
        
        const container = document.querySelector('.titles')
        if (container) container.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            titles.forEach(t => t.removeEventListener('mouseenter', handleMouseEnter))
            if (container) container.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [mat1, mat2, mat3, mat4, mat5, mat6, mat7, mat8, mat9, mat10, mat11])


    return (
        <group ref={rotationGroup}>
            <primitive ref={dogModel} object={model.scene} position={[ 0.25, -0.55, 0 ]} rotation={[ 0, Math.PI / 3.9, 0 ]} />
            <directionalLight position={[ 0, 5, 5 ]} color={0xFFFFFF} intensity={10} />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
        </group>
    )
}

export default Dog