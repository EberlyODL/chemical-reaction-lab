import 'aframe'

const register = () => {
  AFRAME.registerComponent('bottle', {
    init: function () {
      var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 )
      var shader = THREE.FresnelShader
      var uniforms = THREE.UniformsUtils.clone( shader.uniforms )
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
      })
      var mesh = new THREE.Mesh( geometry, material );
      this.el.setObject3D('mesh', mesh)
    },
  })
}

export default register()