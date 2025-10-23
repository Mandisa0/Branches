import subprocess

try:
    subprocess.run([
    "python", "-m", "uvicorn", "main:app",
    "--reload",
    "--host", "132.148.181.9",
    "--port", "7620"
], check=True)
except subprocess.CalledProcessError as e:
    print(f"Error running uvicorn: {e}")
except KeyboardInterrupt:
    print("\nServer stopped manually.")