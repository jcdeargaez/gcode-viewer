import React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import './Viewport.css'


class Viewport extends React.Component {
    constructor() {
        super()
        this.state = {
            objects: []
        }
    }

    componentDidMount() {
        let positions
        let colors

        let layer
        let action
        let t, x, y, f // action fields
        let z = 0
        let hue
        let currentColor

        let geometry
        let material
        let line

        const scene = new THREE.Scene()
        this.setState({
            scene
        })

        for (layer of this.props.layers) {
            z += 0.1
            positions = []
            colors = []
            f = 0
            for (action of layer.actions) {
                [t, x, y, f] = action
                if (f) {
                    // f > 3600 => hue =   0 (red)
                    // f = 0    => hue = 240 (blue)
                    hue = Math.max(0, 1 - f/3600) * 240
                    currentColor = new THREE.Color(`hsl(${hue}, 100%, 50%)`)
                }
                if (x && y) {
                    positions.push(x, y, z)
                    colors.push(currentColor.r, currentColor.g, currentColor.b)
                }
            }
            geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
            geometry.center()
            geometry.translate(0, 0, z)
            material = new THREE.LineBasicMaterial({vertexColors: true})
            line = new THREE.Line(geometry, material)
            scene.add(line)
            this.state.objects.push(line)
        }

        const viewport = this.refs.viewport
        const w = viewport.clientWidth
        const h = viewport.clientHeight - 4
        const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 500)
        camera.position.set(0, 0, 50)
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(w, h, false)
        renderer.setClearColor(0xffffff)
        renderer.outputEncoding = THREE.sRGBEncoding
        viewport.appendChild(renderer.domElement)

        const controls = new OrbitControls(camera, renderer.domElement)
        // controls.autoRotate = true
        controls.enableDamping = true
        controls.dampingFactor = .2

        function animate() {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }

        animate()
    }

    componentDidUpdate() {
        this.filterObjects()
    }

    filterObjects() {
        if (this.state.scene) {
            this.state.objects.forEach((obj, i) => {
                this.state.scene.remove(obj)
                if (this.props.selectedLayers[i]) {
                    this.state.scene.add(obj)
                }
            })
        }
    }

    render() {
        return (
            <div id="Viewport" ref="viewport">
            </div>
        )
    }
}

export default Viewport
