---
title: Upgrade a collator
subtitle: Instructions on how to upgrade your node version
author: chris
tags: [infra, collator]
date: 2022-06-04
---

Please join the [Ava Protocol Discord](https://discord.gg/7W9UDvsbwh) server to be notified of new node versions. This will be announced in technical updates channels. If are not diligent about upgrading to the lastest node version, your node may stop producing blocks and you will likely get less rewards (if you are part of the candidate pool).

The steps below should only cause 3-5 minutes of downtime for your node, if done properly.

### Step 1: Connect to your machine
SSH to your target node, and make sure it's functioning properly by inspecting [Turing Network Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d), and your monitoring/dashboards.
## Step 2: Upgrade the collator application
### Option 1: Upgrade with Release binary
If you are using Ubuntu (20.04+ LTS x64), you can run the binary compiled by Ava Protocol that can be found [here](https://github.com/AvaProtocol/OAK-blockchain/releases/latest). Below commands will help you download the binary via command line.

First, get the latest version number and store it in $version variable.

```
latest_url=$(curl -Lsf -w %{url_effective} https://github.com/AvaProtocol/OAK-blockchain/releases/latest/download/)
version=${latest_url##*/}
echo $version
```
The `echo` command will print out the version of the collator to be installed. Then, run the below command to download a .deb file, unpackage it and install the binary.

```bash
# Download the latest .deb file
curl -L https://github.com/AvaProtocol/OAK-blockchain/releases/download/$version/oak-collator.deb -o oak-collator-$version.deb

# Unpackage and install the .deb file
sudo dpkg -i oak-collator-$version.deb
```

If you're managing the program using `systemd`, you'll need to reload the daemon due to the change in the application binary file, then restart the service. If you're not using systemd, you can manually terminate the program and re-execute the oak-collator command to start the program again.

```bash
sudo systemctl daemon-reload
sudo systemctl restart oak-collator
```

### Option 2: Build from source code
If you machine runs a different architecture, or you are struggling with binaries from the above, you may need to compile the binary within your node. If you're running a different OS, please compile the binary first and follow the instructions in the OAK-blockchain [README](https://github.com/AvaProtocol/OAK-blockchain). For example, for the v1.9.0 binary, you can run the following command on your node.

```bash
git clone git@github.com:OAK-Foundation/OAK-blockchain.git
git fetch --all --tags
git checkout tags/v1.9.0 -b branch-1.9.0

Switched to a new branch 'branch-1.9.0'
```

Then build your executable for Turing Network.

```bash
cargo build --release --features turing-node
```

Aftewards, manually replace the old oak-collator binary file with the new build. If you're managing the program using `systemd`, you'll need to reload the daemon due to the change in the application binary file, then restart the service. If you're not using systemd, you can manually terminate the program and re-execute the oak-collator command to start the program again.

```bash
sudo systemctl daemon-reload
sudo systemctl restart oak-collator
```

### Option 3: Pull Docker image
If you opt to run the collator using Docker, you'll find the Docker builds on [Ava Protocol’s DockerHub](https://hub.docker.com/r/oaknetwork/turing/tags). Pull the latest image and 

```bash
docker pull oaknetwork/turing:latest
```

```bash
# Stop the existing application
docker stop <existing_container_id>

# Re-run the docker run to restart the application
docker run -d -p 30333:30333 -p 9944:9944 -p 9933:9933  -v turing-data:/data
  oaknetwork/turing:latest \
  --name=<collator_name> \
  --base-path=/data \
  --chain=turing \
  --node-key=<node_key> \
  --collator \
  --force-authoring \
  --execution=wasm \
  -- \
  --execution=wasm \
  --no-telemetry
```

### Step 3: Monitor the upgrade result
Ensure to monitor your node for a few minutes to verify that it maintains synchronization with other nodes. If the process is successful, the updated node version of your collator should be visible on [Turing Network Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d). Should you encounter any issues or notice any bugs during the upgrade, please feel free to reach out to our team via the [Ava Protocol Discord](https://discord.gg/7W9UDvsbwh) for assistance.