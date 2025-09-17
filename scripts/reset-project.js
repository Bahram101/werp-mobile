const { execSync } = require("child_process");
const fs = require("fs");

console.log("🧹 Resetting project...");

try {
  // Удаляем node_modules
  fs.rmSync("node_modules", { recursive: true, force: true });
  // Удаляем lock-файл
  if (fs.existsSync("package-lock.json")) fs.rmSync("package-lock.json");
  if (fs.existsSync("yarn.lock")) fs.rmSync("yarn.lock");
  // Удаляем expo cache
  fs.rmSync(".expo", { recursive: true, force: true });

  // Ставим зависимости заново
  execSync("npm install", { stdio: "inherit" });

  console.log("✅ Project has been reset successfully!");
} catch (err) {
  console.error("❌ Error during reset:", err.message);
}
