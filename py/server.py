import subprocess

try:
    subprocess.run(["python", "-m", "uvicorn", "main:app", "--reload"], check=True)
except subprocess.CalledProcessError as e:
    print(f"Error running uvicorn: {e}")
except KeyboardInterrupt:
    print("\nServer stopped manually.")