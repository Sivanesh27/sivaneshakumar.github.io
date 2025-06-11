// 📍 animations.js | Line 1+
//////////////////////////////////////
// 1. Section entrance animation
//////////////////////////////////////
gsap.utils.toArray(".content-inner").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

//////////////////////////////////////
// 2. Hero text fade in
//////////////////////////////////////
gsap.from(".header p, .header h1, .header h2", {
  opacity: 0,
  y: 60,
  duration: 1.2,
  ease: "power3.out",
  stagger: 0.15
});

//////////////////////////////////////
// 3. Animate skill bars
//////////////////////////////////////
gsap.utils.toArray(".progress-bar").forEach(bar => {
  const val = bar.getAttribute("aria-valuenow");
  gsap.fromTo(bar,
    { width: 0 },
    {
      width: `${val}%`,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 90%"
      }
    });
});

//////////////////////////////////////
// 4. Add 3-D Three.js background
//////////////////////////////////////
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("heroCanvas"),
  alpha: true,
  antialias: true
});
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);

const geometry = new THREE.IcosahedronGeometry(1, 1);  // low-poly sphere
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Auto resize on window change
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Rotate mesh frame-by-frame
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.004;
  renderer.render(scene, camera);
}
animate();
