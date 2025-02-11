function mostrarModelo(modelPath) {
    const modelView = document.getElementById("model-view");
    const model3D = document.getElementById("model-3d");

    model3D.setAttribute("gltf-model", modelPath);
    modelView.style.display = "block";
}

function cerrarModelo() {
    document.getElementById("model-view").style.display = "none";
    document.getElementById("model-3d").setAttribute("gltf-model", "");
}
