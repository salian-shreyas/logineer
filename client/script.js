let currentQrId = "";

function showMachineInfo(machine) {
  document.getElementById('machine-info').classList.remove('hidden');
  document.getElementById('machine-id').textContent = machine.qrId;
  document.getElementById('machine-name').textContent = machine.name;
  document.getElementById('machine-location').textContent = machine.location;
  currentQrId = machine.qrId;
}

function startScanner() {
  const qr = new Html5Qrcode("qr-reader");
  qr.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 250,
    },
    async (qrText) => {
      qr.stop(); // Stop scanning
      try {
        const res = await fetch(`http://localhost:3000/api/machines/${qrText}`);
        if (!res.ok) throw new Error("Machine not found");
        const data = await res.json();
        showMachineInfo(data);
      } catch (err) {
        alert("Invalid QR or machine not found");
        qr.start(); // Retry scanning
      }
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  startScanner();

  document.getElementById("log-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = {
      qrId: currentQrId,
      technicianName: document.getElementById("technician").value,
      remarks: document.getElementById("remarks").value,
      nextMaintenanceDate: document.getElementById("next-date").value,
    };
    try {
      const res = await fetch("http://localhost:3000/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      document.getElementById("response-msg").textContent = result.message || "Log submitted!";
    } catch (err) {
      document.getElementById("response-msg").textContent = "Error submitting log.";
    }
  });
});
