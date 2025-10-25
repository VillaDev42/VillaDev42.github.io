const btn = document.getElementById("downloadBtn");
const urlInput = document.getElementById("urlInput");
const statusLabel = document.getElementById("status");

// Cambia esta URL por la de tu API expuesta con ngrok
const apiBaseUrl = "https://8b6cfc1a3b20.ngrok-free.app";

function getCleanFileName(disposition) {
    if (!disposition) return "cancion.mp3";

    let fileName = "cancion.mp3";

    // Intentar extraer filename* (RFC 5987)
    const rfc5987 = disposition.match(/filename\*\s*=\s*[^']*''(.+)$/);
    if (rfc5987) {
        fileName = decodeURIComponent(rfc5987[1]); // decodifica %20, etc.
    } else {
        // fallback: buscar filename normal
        const simple = disposition.match(/filename="?(.+?)"?($|;)/);
        if (simple) fileName = simple[1];
    }

    // Cortar todo después del último punto
    const lastDot = fileName.lastIndexOf(".");
    if (lastDot !== -1) {
        fileName = fileName.substring(0, lastDot);
    }

    // Limpiar caracteres inválidos
    fileName = fileName.replace(/[\\\/:*?"<>|]/g, "").trim();

    // Agregar extensión mp3
    return fileName;
}

btn.addEventListener("click", async () => {
    const youtubeUrl = urlInput.value.trim();
    if (!youtubeUrl) {
        alert("Ingresa un link de YouTube");
        return;
    }

    statusLabel.textContent = "Descargando...";

    try {
        // Llamada POST a la API
        const response = await fetch(`${apiBaseUrl}/api/download/mp3`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: youtubeUrl })
        });

        if (!response.ok) throw new Error("Error al descargar el archivo");

        // Obtener el archivo como blob
        const blob = await response.blob();
        const disposition = response.headers.get("Content-Disposition");
        const fileName = getCleanFileName(disposition);

        // Crear link temporal para descargar
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();

        statusLabel.textContent = "¡Descarga completa!";
    } catch (err) {
        statusLabel.textContent = "Error: " + err.message;
    }
});




