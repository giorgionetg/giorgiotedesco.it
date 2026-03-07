---
slug: from-local-to-self-hosted-cloud
title: "From Local Directories to a Self-Hosted Cloud: The Architectural Evolution"
description: "A deep dive into migrating from folder-centric development to a professional self-hosted stack using Forgejo, Traefik, PocketBase, and GarageHQ."
category: on-web-development
tags: ["devops", "self-hosting", "docker", "traefik", "pocketbase", "nextjs", "forgejo", "garagehq"]
image: patrick-fore-0_AX9pab940-unsplash.jpg
datePublished: "2026-03-07T09:00:00+01:00"
dateModified: "2026-03-07T09:00:00+01:00"
---

### The Vision
Stop building "folder-centric" projects. I started there, like everyone else. A local folder, some binaries, and code all mixed together. It works for a week. Then it breaks. 

I decided to move everything into a professional, self-hosted cloud infrastructure. No public cloud dependencies, no "it works on my machine" excuses. I wanted a clean, decoupled, and containerized stack that I could "re-ignite" anywhere in minutes.

### Step 1: Forgejo and the Single Source of Truth
First move: I ditched the local directory for **Forgejo**. I deployed it containerized to have full control over my Git flow. 

I split the infrastructure:
* **Core Repo:** Pure logic and app code.
* **Infra Repo:** Docker Compose, routing, and environment orchestration.

By setting up a **Private Container Registry** inside Forgejo, I shifted the workflow. I don't push code to servers anymore. I build an image, push it to my registry, and pull it in production. Clean. Atomic. Versioned.

### Step 2: Edge Routing with Traefik
I don't waste time with manual Nginx configs anymore. I implemented **Traefik** as the edge router. 

It listens to the Docker socket. When I spin up a new container—whether it’s the **Next.js** frontend or the **PocketBase** backend—Traefik detects it, handles the SSL certificates via Let's Encrypt, and routes the traffic. It’s dynamic, it’s fast, and it enables zero-downtime migrations.

### Step 3: Hardening the Backend (PocketBase)
PocketBase is great, but you need to use it right. I moved away from simple folder mapping. I started "baking" my custom Go hooks and migrations directly into the Docker image. 

The real test? Moving the entire instance across repositories. By decoupling the `/pb_data` volume and injecting secrets—admin credentials, encryption keys—via environment variables, I re-lit the system in a new environment instantly. No data loss, no configuration hell.

### Step 4: Storage and Static Sites with GarageHQ
To handle assets and static sites without local disk dependencies, I brought in **GarageHQ**. 

It’s a distributed, S3-compatible storage layer. By using GarageHQ, my services are now truly stateless. My static assets and generated sites live in S3 buckets. If a node goes down, I just spin up the containers elsewhere and reconnect to the storage cluster. 

### The "Dogfooding" Reality
I’m using my own infrastructure to build my infrastructure. My Forgejo instance builds the images, stores them, and helps deploy them. 

When I flipped the switch, everything worked. Secrets injected, S3 buckets mounted, registry pulling the exact byte-for-byte image I tested in dev. This is how you move from a "project" to a "platform."

### Final Thoughts
Architecture matters more than code. By decoupling logic from infrastructure and self-hosting the entire chain—from **Forgejo** to **GarageHQ**—I own the supply chain. 

It’s secure, it’s portable, and it’s mine.