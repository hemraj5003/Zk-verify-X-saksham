from scapy.all import *
import joblib
import os
import pandas as pd
import numpy as np
import psutil  # To check running processes
import joblib
import os

current_dir = os.path.dirname(os.path.abspath(__file__))  # Get script's directory
model_path = os.path.join(current_dir, "firewall.pkl")

model = joblib.load(model_path)


def extract_features(packet):
    """Extracts features from network packets for AI model"""
    features = {
        'protocol_type': packet.proto if IP in packet else 0,
        'flag': packet[TCP].flags if TCP in packet else 0,
        'src_bytes': len(packet.payload) if packet.haslayer(Raw) else 0,
        'dst_bytes': len(packet.payload) if packet.haslayer(Raw) else 0,
        'count': 1,
        'same_srv_rate': 0,
        'diff_srv_rate': 0,
        'dst_host_srv_count': 1,
        'dst_host_same_srv_rate': 0,
        'dst_host_same_src_port_rate': 0
    }
    return features
    

def detect_and_kill_nmap():
    """Detects and kills the nmap process if running"""
    for proc in psutil.process_iter(attrs=['pid', 'name']):
        if "nmap" in proc.info['name'].lower():
            print(f"🚨 Detected Nmap process (PID: {proc.info['pid']}) - Terminating...")
            os.kill(proc.info['pid'], 9)  # Force kill process

def predict_traffic(packet):
    """Predict if the traffic is malicious or safe"""
    features = extract_features(packet)
    df = pd.DataFrame([features])  # Convert to DataFrame
    prediction = model.predict(df)

    if prediction[0] == 1:  # 1 = Malicious
        print("🚨 ALERT! Malicious Packet Detected")
        block_ip(packet[IP].src)
        detect_and_kill_nmap()  # Check and kill nmap
    else:
        print("✅ Normal Packet")

def block_ip(ip):
    """Block malicious IP using Windows Firewall"""
    command = f'netsh advfirewall firewall add rule name="Blocked IP {ip}" dir=in action=block remoteip={ip}'
    os.system(command)
    print(f"⛔ IP {ip} has been blocked.")

while True:
    try:
        print("🛡️ AI Firewall is running... Press Ctrl+C to stop.")
        sniff(iface="Wi-Fi", prn=predict_traffic, store=0)
    except Exception as e:
        print(f"⚠️ Error: {e}. Restarting sniffing...")
